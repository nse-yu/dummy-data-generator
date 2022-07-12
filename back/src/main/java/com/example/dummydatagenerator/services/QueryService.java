package com.example.dummydatagenerator.services;

import com.example.dummydatagenerator.CsvDTO;
import com.example.dummydatagenerator.util.Generators;
import com.example.dummydatagenerator.util.UtilMethods;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Service
public class QueryService {
    private final JdbcTemplate template;
    private final JsonService jsonService;

    private int limit = 10;
    private final RowMapper<CsvDTO> mapper = (resultSet, rowNum) -> {
        CsvDTO usr = new CsvDTO();
        usr.setPrefecture(resultSet.getString("prefecture"));
        usr.setCity(resultSet.getString("city"));
        usr.setArea(resultSet.getString("area"));
        return usr;
    };

    @Autowired
    public QueryService(JdbcTemplate template,JsonService service){
        this.template = template;
        this.jsonService = service;
    }
    public void setLimit(int limit) {
        this.limit = limit;
    }

    private String getColTitle(JsonNode node, String def_name) {
        return node.get("colname").toString().equals("\"\"") ?
                def_name
                :
                node.get("colname").toString()
                ;
    }

    /*===================query services according to node id==================*/
    public List<List<String>> assignService(JsonNode node){
        if(node.get("id").isNull())
            return null;
        if(!node.get("id").isNumber())
            return null;

        switch (UtilMethods.parseBaseId(node.get("id").asInt(),9)) {
            case 1 -> {
                return findId(node);
            }
            case 2 -> {
                return findName(node);
            }
            case 3 -> {
                return findPlace(node);
            }
            case 4 -> {
                return findNumber(node);
            }
            case 5 -> {
                return findDate(node);
            }
            case 6 -> {
                return findTime(node);
            }
            case 7 -> {
                return findAddress(node);
            }
            case 8 -> {
                return findPhone(node);
            }
            case 9 -> {
                return findText(node);
            }
            default -> throw new IllegalStateException("Unexpected value: " + node.get("id").asInt());
        }
    }

    //==============================find commands==============================//
    private List<List<String>> findPhone(JsonNode node) {
        List<List<String>> colStack = new ArrayList<>();
        String col_name = getColTitle(node, "phone");
        colStack.add(Stream.concat(Stream.of(col_name),Generators.randomPhone(limit).stream()).collect(Collectors.toList()));
        return colStack;
    }

    private List<List<String>> findAddress(JsonNode node) {
        List<List<String>> colStack = new ArrayList<>();
        String[] tags = List.of("prefecture", "city", "area").toArray(new String[0]);
        String col_name = getColTitle(node, "address");
        String queryString = String.format(
                "SELECT DISTINCT prefecture,city,area FROM post_area ORDER BY RAND() LIMIT %s;",limit);

        List<String> strings = template.query(queryString,mapper).stream()
                .map(entry -> String.format("%s,%s,%s",entry.getPrefecture(),entry.getCity(),entry.getArea()))
                .toList();

        //separateされていない場合
        boolean isSeparate = jsonService.findBooleanFields(node).stream()
                .noneMatch(fields ->
                        fields.containsKey("separate_address")
                                && !fields.get("separate_address")
                );
        if(!isSeparate){
            strings = strings.stream().map(entry -> entry.replace(","," ")).toList();
            colStack.add(Stream.concat(Stream.of(col_name), strings.stream()).collect(Collectors.toList()));
            return colStack;
        }

        //separateされている場合
        List<List<String>> lists = strings.stream().map(string -> List.of(string.split(","))).toList();
        List<List<String>> lists1 = IntStream.range(0, lists.get(0).size())
                .mapToObj(i ->
                        lists.stream().map(list -> list.get(i)).toList()
                )
                .toList();
        return IntStream.range(0,tags.length).mapToObj(
                i -> Stream.concat(tags[i].lines(),lists1.get(i).stream()).toList()).toList();
    }

    private List<List<String>> findTime(JsonNode node) {
        List<List<String>> colStack = new ArrayList<>();
        String col_name = getColTitle(node, "time");
        colStack.add(Stream.concat(Stream.of(col_name),Generators.randomTime(limit).stream()).collect(Collectors.toList()));
        return colStack;
    }

    private List<List<String>> findDate(JsonNode node) {
        List<List<String>> colStack = new ArrayList<>();
        String col_name = getColTitle(node, "date");
        colStack.add(Stream.concat(Stream.of(col_name),Generators.randomDate(limit).stream()).collect(Collectors.toList()));
        return colStack;
    }

    private List<List<String>> findText(JsonNode node){
        List<List<String>> colStack = new ArrayList<>();
        String col_name = getColTitle(node, "text");
        int len = node.get("len").isNumber() && !node.get("len").isNull()
                ?
                node.get("len").asInt()
                :
                Integer.parseInt(node.get("len").toString().replace("\"",""))
                ;
        colStack.add(Stream.concat(Stream.of(col_name),Generators.randomText(len, limit).stream()).collect(Collectors.toList()));
        return colStack;
    }

    private List<List<String>> findNumber(JsonNode node) {
        List<List<String>> colStack = new ArrayList<>();
        String col_name = getColTitle(node, "num");
        int from = node.get("from").isNumber() && !node.get("from").isNull()
                ?
                node.get("from").asInt()
                :
                Integer.parseInt(node.get("from").toString().replace("\"",""))
                ;
        int to = node.get("to").isNumber() && !node.get("to").isNull() ?
                node.get("to").asInt()
                :
                Integer.parseInt(node.get("to").toString().replace("\"",""))
                ;
        boolean isDecimal = jsonService.findBooleanFields(node).stream()
                .noneMatch(fields ->
                        fields.containsKey("is_decimal")
                                && !fields.get("is_decimal")
                );

        colStack.add(Stream.concat(Stream.of(col_name),Generators.randomRange(from, to, limit, isDecimal).stream()).collect(Collectors.toList()));
        return colStack;
    }

    private List<List<String>> findPlace(JsonNode node) {
        List<List<String>> colStack = new ArrayList<>();
        List<String> places = List.of("遊園地","公園","ショッピングモール","水族館","学校","美容院","カフェ","コンビニ","図書館");
        String col_name = getColTitle(node, "place");
        colStack.add(Stream.concat(Stream.of(col_name),Generators.randomFetch(places, limit).stream()).collect(Collectors.toList()));
        return colStack;
    }

    /**
     * name.csvから名前一覧を取得
     */
    private List<List<String>> findName(JsonNode node) {
        /*各種変数初期化*/
        String[] tags = List.of("firstname", "lastname").toArray(new String[0]);
        List<List<String>> colStack = new ArrayList<>();
        List<String[]> csv;

        try {
            csv = UtilMethods.readCsv(new File("src/main/resources/static/name.csv"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String col_name = getColTitle(node, "name");
        System.out.println("col_name = "+col_name);
        List<String> strings = jsonService.findBooleanFields(node).stream()
                .anyMatch(fields ->
                        fields.containsKey("separate_name")
                        &&
                        !fields.get("separate_name")
                )
                ?
                Generators.separateByCols(csv, limit)
                :
                Generators.concatByPlus(csv, limit);

        //separateされていない場合
        if(!strings.get(0).contains(",")) {
            colStack.add(Stream.concat(Stream.of(col_name), strings.stream()).collect(Collectors.toList()));
            return colStack;
        }

        //separateされている場合
        List<List<String>> lists = strings.stream().map(string -> List.of(string.split(","))).toList();
        List<List<String>> lists1 = IntStream.range(0, lists.get(0).size())
                .mapToObj(i ->
                        lists.stream().map(list -> list.get(i)).toList()
                )
                .toList();
        return IntStream.range(0,tags.length).mapToObj(
                i -> Stream.concat(tags[i].lines(),lists1.get(i).stream()).toList()).toList();
    }

    /**
     * Idをランダム生成
     */
    public List<List<String>> findId(JsonNode node){
        List<List<String>> colStack = new ArrayList<>();
        String col_name = getColTitle(node, "id");
        List<String> strings = jsonService.findBooleanFields(node).stream()
                .anyMatch(fields ->
                        fields.containsKey("include_char")
                                && !fields.get("include_char")
                )
                ?
                Generators.generateId(limit, false)
                :
                Generators.generateId(limit, true);
        colStack.add(Stream.concat(Stream.of(col_name),strings.stream()).collect(Collectors.toList()));
        return colStack;
    }
}
