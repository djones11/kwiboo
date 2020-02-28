import language from "@/stubs/language.json";

export default {
  getLanguage: state => {
    let languageType = state["chosenLanguage"];
    let foundLanguage = {};

    for (let property in language) {      
      let _languageType = language[property].hasOwnProperty(languageType)
        ? languageType
        : "en";

      foundLanguage[property] = language[property][_languageType];
    }
    
    return foundLanguage;
  },
};
