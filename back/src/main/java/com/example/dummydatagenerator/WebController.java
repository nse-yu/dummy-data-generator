package com.example.dummydatagenerator;

import com.example.dummydatagenerator.services.JsonService;
import com.example.dummydatagenerator.services.QueryService;
import com.example.dummydatagenerator.util.UtilMethods;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class WebController {
    private final JsonService jsonService;
    private final QueryService queryService;

    @Autowired
    public WebController(JsonService jsonService,QueryService queryService){
        this.jsonService = jsonService;
        this.queryService = queryService;
    }

    @PostMapping(value = "/csv/create")
    @CrossOrigin
    public ResponseEntity<byte[]> createCsvFromPost(@RequestParam("json_form") String json,
                                            @RequestParam("limit") int limit) throws IOException {
        //----------0-----------:サービスの初期化
        queryService.setLimit(limit);

        //----------1-----------:使用する列のみ抽出
        //use=trueのみのノードリスト
        List<JsonNode> nodes_on_use;
        if(json.isBlank() || json.isEmpty())
            return null; //TODO: return statements to be fixed
        nodes_on_use = jsonService.parseJsonOnUse(json);

        //----------2-----------:各列をサービスに割り当て、処理結果を得る
        List<List<List<String>>> data = nodes_on_use.stream()
                .map(queryService::assignService)
                .toList();

        //----------3-----------:ファイルへの書き込み
        UtilMethods.writeCsv(data);

        //----------4-----------:ファイルを送信
        try (FileInputStream fis = new FileInputStream("src/main/resources/static/output.csv")) {
            //レスポンスヘッダーの設定
            HttpHeaders headers = new HttpHeaders();
            headers.setContentDispositionFormData("filename","output.csv");
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

            return new ResponseEntity<>(fis.readAllBytes(),headers, HttpStatus.OK);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
