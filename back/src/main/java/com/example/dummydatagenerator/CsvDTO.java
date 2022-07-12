package com.example.dummydatagenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CsvDTO {
    private String prefecture;
    private String city;
    private String area;
}
