"use client";

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  FlatList,
  StyleSheet,
} from "react-native";
import { carparkData } from "@/constants/carpark";
import CarparkCard from "@/components/CarparkCard";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    freeParking: false,
    openNow: false,
  });

  const handleToggle = (key: "freeParking" | "openNow") => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCarparks = carparkData.filter((carpark) => {
    const matchesSearch =
      carpark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carpark.suburb.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFreeParking =
      !filters.freeParking || carpark.freeParking === true;

    const matchesOpenNow = !filters.openNow || carpark.isOpenNow === true;

    return matchesSearch && matchesFreeParking && matchesOpenNow;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore Carparks</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or suburb"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Free Parking</Text>
          <Switch
            value={filters.freeParking}
            onValueChange={() => handleToggle("freeParking")}
          />
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Open Now</Text>
          <Switch
            value={filters.openNow}
            onValueChange={() => handleToggle("openNow")}
          />
        </View>
      </View>

      <FlatList
        data={filteredCarparks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CarparkCard data={item} />}
        ListEmptyComponent={
          <Text style={styles.noResults}>No matching carparks found.</Text>
        }
      />
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  filterLabel: {
    fontSize: 16,
  },
  noResults: {
    marginTop: 32,
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
});
