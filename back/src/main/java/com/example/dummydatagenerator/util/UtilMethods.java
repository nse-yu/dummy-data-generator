package com.example.dummydatagenerator.util;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

import java.io.*;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class UtilMethods {
    /**ファイルパスで指定される.csv形式のファイルを読み込み、コンマ区切りで*/
    public static List<String[]> readCsv(File csv) throws IOException {
        try (CSVReader reader = new CSVReader(new FileReader(csv))) {
            return reader.readAll();
        } catch (CsvException e) {
            throw new RuntimeException(e);
        }
    }

    public static boolean writeCsv(List<List<List<String>>> data){
        //リストの次元を下げて処理を単純にする
        List<List<String>> al_data = reprocess(data.stream()
                .flatMap(Collection::stream).toList());
        List<String> end_col = al_data.get(al_data.size()-1);

        try (FileWriter writer = new FileWriter("src/main/resources/static/output.csv")) {
            IntStream.range(0,al_data.get(0).size()) //row数
                    .forEach(i -> {
                        try {
                            al_data
                                .forEach(cols -> {
                                    try {
                                        writer.write(cols.get(i));
                                        if(!cols.equals(end_col))
                                            writer.write(",");
                                    } catch (IOException e) {
                                        throw new RuntimeException(e);
                                    }
                                });
                            writer.write("\n");
                        }catch(IOException e){
                            throw new RuntimeException(e);
                        }
                    });
            writer.flush();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    private static List<List<String>> reprocess(List<List<String>> data){
        return data.stream().map(
                entry -> entry.stream().map(str -> str.replace("\"", "")).toList()
        ).collect(Collectors.toList());
    }

    public static int parseBaseId(int id,int n){
        List<String> str_id = Arrays.stream((""+id).split("")).toList();
        return IntStream.rangeClosed(1,n).mapToObj(
                        i -> str_id.stream().allMatch(c -> Objects.equals(c, "" + i))
                )
                .toList().indexOf(true)+1;
    }
}
