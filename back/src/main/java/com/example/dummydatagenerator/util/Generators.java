package com.example.dummydatagenerator.util;

import java.util.Arrays;
import java.util.List;
import java.util.random.RandomGenerator;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Generators {
    public static List<String> separateByCols(List<String[]> csv,int limit) {
        List<String> strings = csv.stream()
                .distinct()
                .skip(1)
                .map(row -> row[0].concat(row[1]))
                .toList();
        return randomFetch(strings,limit);
    }

    public static List<String> concatByPlus(List<String[]> csv, int limit){
        List<String> strings = csv.stream()
                .distinct()
                .skip(1)
                .map(row -> row[0].concat(",").concat(row[1]))
                .toList();
        return randomFetch(strings,limit);
    }

    public static List<String> generateId(int limit,boolean isContainChar){
        return IntStream.range(0,limit)
                .mapToObj(index ->
                        (!isContainChar ? "" : String.join("",RandomGenerator.getDefault().ints(0x52, 0x55)
                                .filter(Character::isAlphabetic)
                                .skip(1)
                                .limit(1)
                                .mapToObj(d -> String.valueOf(Character.toChars(d)))
                                .toList()
                        ))
                        +
                        String.join("",
                                RandomGenerator.getDefault().ints(0x30,0x7b)
                                        .skip(1)
                                        .filter(Character::isDigit)
                                        .limit(6)
                                        .mapToObj(d -> String.valueOf(Character.toChars(d)))
                                        .toList()
                        )
                )
                .toList();
    }

    public static List<String> randomFetch(List<String> list,int limit){
        return RandomGenerator.getDefault().ints(0, list.size())
                .skip(1)
                .limit(limit)
                .mapToObj(list::get)
                .collect(Collectors.toList());
    }

    public static List<String> randomRange(int from,int to,int limit,boolean isDecimal){
        return !isDecimal ?
                RandomGenerator.getDefault().ints(from,to+1)
                    .skip(1)
                    .limit(limit)
                    .mapToObj(Integer::toString)
                    .toList()
                :
                RandomGenerator.getDefault().doubles(from,to+1)
                        .skip(1)
                        .limit(limit)
                        .mapToObj(d -> String.format("%.1f",d))
                        .toList();
    }

    public static List<String> randomText(int len,int limit){
        return IntStream.rangeClosed(1,limit)
                .mapToObj(i ->
                        RandomGenerator.getDefault().ints(0x30, 0x7b)
                                .filter(c -> Character.isAlphabetic(c) || Character.isDigit(c))
                                .skip(1)
                                .limit(10)
                                .mapToObj(d -> String.valueOf(Character.toChars(d)))
                                .reduce((c1,c2) -> c1+c2).orElseThrow()
                )
                .toList();
    }

    public static List<String> randomTime(int limit){
        List<String> second = RandomGenerator.getDefault().ints(0,60+1)
                .skip(1)
                .limit(limit).mapToObj(Integer::toString).toList();
        List<String> minutes = RandomGenerator.getDefault().ints(0,60+1)
                .skip(1)
                .limit(limit).mapToObj(Integer::toString).toList();
        List<String> hour = RandomGenerator.getDefault().ints(0,24+1)
                .skip(1)
                .limit(limit).mapToObj(Integer::toString).toList();

        return IntStream.range(0,limit).mapToObj(i ->
                        String.format("%s:%s:%s", hour.get(i), minutes.get(i), second.get(i))
                )
                .collect(Collectors.toList());
    }

    public static List<String> randomDate(int limit){
        List<String> date = RandomGenerator.getDefault().ints(1,31+1)
                .skip(1)
                .limit(limit).mapToObj(Integer::toString).toList();
        List<String> month = RandomGenerator.getDefault().ints(1,12+1)
                .skip(1)
                .limit(limit).mapToObj(Integer::toString).toList();
        List<String> year = RandomGenerator.getDefault().ints(1950,2022+1)
                .skip(1)
                .limit(limit).mapToObj(Integer::toString).toList();

        return IntStream.range(0,limit).mapToObj(i ->
                        String.format("%s-%s-%s", year.get(i), month.get(i), date.get(i))
                )
                .collect(Collectors.toList());
    }

    public static List<String> randomPhone(int limit){
        List<String> up = RandomGenerator.getDefault().ints(0,2+1)
                .skip(1)
                .limit(limit).mapToObj(List.of("080","070","090")::get).toList();
        List<String> mid = RandomGenerator.getDefault().ints(1000,9999+1)
                .skip(1)
                .limit(limit).mapToObj(Integer::toString).toList();
        List<String> down = RandomGenerator.getDefault().ints(1000,9999+1)
                .skip(1)
                .limit(limit).mapToObj(Integer::toString).toList();

        return IntStream.range(0,limit).mapToObj(i ->
                        String.format("%s-%s-%s", up.get(i), mid.get(i), down.get(i))
                )
                .collect(Collectors.toList());
    }
}
