# Data_serialization/Сериализация данных.

Первой строкой на вход участнику подается тип сериализации Json или Xml. Следующей строкой посылается сериализованный объект.  
public class Input {  
  public int K { get; set; }  
  public decimal[] Sums { get; set; } public int[] Muls { get; set; }  
}  
На выход участник должен послать сериализованный объект ответа.  
public class Output {  
  public decimal SumResult { get; set; } public int MulResult { get; set; }  
  public decimal[] SortedInputs { get; set; }  
}  
где SumResult сумма всех чисел из массива Sums входного объекта, умноженная на коэффициент K MulResult произведение всех чисел из массива Muls входного обекта
SortedInputs отсортированные числа из полей Sums, Muls входного объекта.   
