package com.example.dummydatagenerator.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JsonService {
    public List<JsonNode> parseJsonOnUse(String jsonString){
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = null;
        try {
            root = mapper.readTree(jsonString);
        } catch (JsonProcessingException e) {
            System.out.printf("failed to parse json-string in [%s]%n", e.getClass().toString());
            return null;
        }
        /*===============プロパティ「use」がfalseのものを取り除きたい===============*/
        //-----1-----:ノードリストからルートノードを取得
        List<JsonNode> nodes = root.findParents("use");

        //-----2-----:ノードリストからuse=falseのノードのみ除外する
        nodes.removeIf(jsonNode -> {
            if(!jsonNode.get("use").isBoolean())
                return false;
            boolean use = jsonNode.get("use").asBoolean();
            ((ObjectNode)jsonNode).remove("use");
            return !use;
        });
        printNodesList(nodes);
        return nodes;
    }

    public void printNodesList(List<JsonNode> nodes){
        System.out.println("===========ACCEPTED===========");
        int i = 1;
        for(JsonNode node : nodes){
            System.out.printf("[NODE: %d] %s\n",i,node.toString());
            i++;
        }
        System.out.println("==============================");
    }

    public List<Map<String,Boolean>> findBooleanFields(JsonNode node){
        List<Map<String,Boolean>> dict = new ArrayList<>(); //ノード単位でのリスト

        for (Iterator<String> it = node.fieldNames(); it.hasNext(); ) {
            String field = it.next();

            if(!node.get(field).asText().equals("true") && !node.get(field).asText().equals("false")) //論理値型以外は飛ばす
                continue;

            Map<String,Boolean> kv = new HashMap<>(); //key-valueマップを生成し、
            kv.put(field,node.get(field).asBoolean());
            dict.add(kv); //dictにkey-valueのペアを複数追加想定
        }
        System.out.println(dict);
        return dict;
    }
}
