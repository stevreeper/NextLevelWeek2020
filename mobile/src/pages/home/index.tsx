import React, { useEffect, useState } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { View, Image, Text, ImageBackground } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

import styles from "./styles";

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [ufs, setufs] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");

  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("Selecione um estado");

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);
        setufs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") return;
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectedUF(value: string) {
    setSelectedUf(value);
  }

  function handleSelectedCity(value: string) {
    setSelectedCity(value);
  }

  function handleNavigateToPoints() {
    navigation.navigate("Points", {
      uf: selectedUf,
      city: selectedCity,
    });
  }

  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      imageStyle={styles.backgroundImage}
      style={styles.container}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu marketplace de coleta de residuos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>
      <RNPickerSelect
        value={selectedUf}
        placeholder={{ label: "Selecione um estado" }}
        onValueChange={handleSelectedUF}
        items={ufs.sort().map((uf) => {
          return {
            key: String(uf),
            label: uf,
            value: uf,
          };
        })}
      />
      <RNPickerSelect
        value={selectedCity}
        placeholder={{ label: "Selecione uma cidade" }}
        onValueChange={handleSelectedCity}
        items={cities.sort().map((city) => {
          return {
            key: String(city),
            label: city,
            value: city,
          };
        })}
      />
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

export default Home;
