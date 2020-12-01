let typeOfSerialization = +prompt(
  "Введите тип сериализации (0 - JSON; 1 - XML"
);

let inputK = +prompt("Введите коэффицент: ", 10),
  inputSums = [],
  inputMuls = [];

let itemsSums = prompt("Введите числa для массива Sums через запятую: ", "1.01,2.02");
inputSums = itemsSums.split(",").map(Number);

let itemsMuls = prompt("Введите числа для массива Muls через запятую: ", "1,4");
inputMuls = itemsMuls.split(",").map(Number);

class Input {
  constructor(K, Sums, Muls) {
    this.K = K;
    this.Sums = Sums;
    this.Muls = Muls;
  }

  SumResult() {
    let sum = 0;
    for (let i = 0; i < this.Sums.length; i++) {
      sum += this.Sums[i];
    }
    let sumFix = sum * this.K;

    return sumFix.toFixed(2);
  }

  MulResult() {
    let mul = 1;
    for (let i = 0; i < this.Muls.length; i++) {
      mul *= this.Muls[i];
    }

    return mul;
  }

  SortedInputs() {
    let arr = this.Sums.concat(this.Muls);

    return arr.sort();
  }
}

class Output extends Input {
  MakeOutput() {
    let out = {
      SumResult: newInt.SumResult(),
      MulResult: newInt.MulResult(),
      SortedInputs: newInt.SortedInputs()
    };

    return out;
  }
}

let newInt = new Input(inputK, inputSums, inputMuls);
let newOut = new Output().MakeOutput();

function xmlFormInput() {
  let item = "",
    item1 = "";

  for (let i = 0; i < inputSums.length; i++) {
    item += "<decimal>" + inputSums[i] + "</decimal>";
  }

  for (let j = 0; j < inputMuls.length; j++) {
    item1 += "<int>" + inputMuls[j] + "</int>";
  }

  return `<Input><K>${inputK}</K><Sums>${item}</Sums><Muls>${item1}</Muls></Input>`;
}

function xmlFormOutput() {
  let item = "";

  for (let i = 0; i < newInt.SortedInputs().length; i++) {
    item += "<decimal>" + newInt.SortedInputs()[i] + "</decimal>";
  }

  return `<Output><SumResult>${newInt.SumResult()}</SumResult><MulResult>${newInt.MulResult()}</MulResult><SortedInputs>${item}</SortedInputs></Output>`;
}

function parseXML(xmlString) {
  let parser = new DOMParser();
  let docError = parser.parseFromString("INVALID", "text/xml");
  let parsererrorNS = docError.getElementsByTagName("parsererror")[0]
    .namespaceURI;
  let doc = parser.parseFromString(xmlString, "text/xml");
  if (doc.getElementsByTagNameNS(parsererrorNS, "parsererror").length > 0) {
    throw new Error("Error parsing XML");
  }

  return doc;
}

if (typeOfSerialization == 0) {
  console.log(
    "Посланый сериализованный объект в формате JSON: " + JSON.stringify(newInt)
  );
  console.log(
    "Сериализованный объект ответа в формате JSON: " + JSON.stringify(newOut)
  );
} else if (typeOfSerialization == 1) {
  let intXml = xmlFormInput();
  let outXml = xmlFormOutput();
  // console.log('intXml: ', intXml);
  console.log("parseXML(intXml): ", parseXML(intXml));
  // console.log('outXml: ', outXml);
  console.log("parseXML(outXml): ", parseXML(outXml));
} else {
  console.log("Error");
}