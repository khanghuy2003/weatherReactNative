export type RootStackParamList = {
    'Home' : undefined,
    'ViewWeather' : { province : Province }
}

export type Province = {
    "ID": string,
    "LocalizedName": string,
    "EnglishName": string,
    "Level": number,
    "LocalizedType": string,
    "EnglishType": string,
    "CountryID": "VN"
}
export const API_KEY = `UNLDJzlIfieGCxNQtu8CLNN1uTY4IaxF`

export type DuBaoThoiTiet = {
    Headline: {
      EffectiveDate: string;
      EffectiveEpochDate: number;
      Severity: number;
      Text: string;
      Category: string;
      EndDate: string;
      EndEpochDate: number;
      MobileLink: string;
      Link: string;
    };
    DailyForecasts: {
      Date: string;
      EpochDate: number;
      Temperature: {
        Minimum: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
        Maximum: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
      };
      Day: {
        Icon: number;
        IconPhrase: string;
        HasPrecipitation: boolean;
      };
      Night: {
        Icon: number;
        IconPhrase: string;
        HasPrecipitation: boolean;
      };
      Sources: string[];
      MobileLink: string;
      Link: string;
    }[];
  };

export const weatherIcons: { [key: number]: any } = {
    1: require('../picture/icon/1.png'),
    2: require('../picture/icon/2.png'),
    3: require('../picture/icon/3.png'),
    4: require('../picture/icon/4.png'),
    5: require('../picture/icon/5.png'),
    6: require('../picture/icon/6.png'),
    7: require('../picture/icon/7.png'),
    8: require('../picture/icon/8.png'),
    11: require('../picture/icon/11.png'),
    12: require('../picture/icon/12.png'),
    13: require('../picture/icon/13.png'),
    14: require('../picture/icon/14.png'),
    15: require('../picture/icon/15.png'),
    16: require('../picture/icon/16.png'),
    17: require('../picture/icon/17.png'),
    18: require('../picture/icon/18.png'),
    19: require('../picture/icon/19.png'),
    20: require('../picture/icon/20.png'),
    21: require('../picture/icon/21.png'),
    22: require('../picture/icon/22.png'),
    23: require('../picture/icon/23.png'),
    24: require('../picture/icon/24.png'),
    25: require('../picture/icon/25.png'),
    26: require('../picture/icon/26.png'),
    29: require('../picture/icon/29.png'),
    30: require('../picture/icon/30.png'),
    31: require('../picture/icon/31.png'),
    32: require('../picture/icon/32.png'),
    33: require('../picture/icon/33.png'),
    34: require('../picture/icon/34.png'),
    35: require('../picture/icon/35.png'),
    36: require('../picture/icon/36.png'),
    37: require('../picture/icon/37.png'),
    38: require('../picture/icon/38.png'),
    39: require('../picture/icon/39.png'),
    40: require('../picture/icon/40.png'),
    41: require('../picture/icon/41.png'),
    42: require('../picture/icon/42.png'),
    43: require('../picture/icon/43.png'),
    44: require('../picture/icon/44.png'),
  };