import language from "@/stubs/language.json";

export default {
  getLanguage: state => {
    let languageType = state["chosenLanguage"];
    let foundLanguage = {};

    for (let property in language) {
      foundLanguage[property] = language[property][languageType];
    }
    
    return foundLanguage;
  },
};
