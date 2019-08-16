# Typescript

## 创建tscconfig.json文件 tsc --init 生成配置文件

## 一、基本类型

### 布尔类型( boolean )

    let flag: boolean = true;

### 数字类型( number ) 
    TypeScript数字都是浮点型，也支持二进制、八进制、十进制和十六进制

```
    let num: number = 123;
    let hexLiteral: number = 0xf00d;
    let binaryLiteral: number = 0b1010;
    let octalLiteral: number = 0o744;
```

### 字符串类型( string ) 
    可以用单引号（'）和双引号（"）来表示字符串类型，除此之外还支持使用模板字符串反引号（`）来定义多行文本和内嵌表达式。使用${ expr }的形式嵌入变量或表达式

```
    let name: string = `Gene`;
    let age: number = 37;
    let sentence: string = `Hello, my name is ${ name }.

    I'll be ${ age + 1 } years old next month.`;
```

### 数组( array )
    TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组：

    let arr: number[] = [1,2,3];

    第二种方式是使用数组泛型，Array<元素类型>：

    let arr: Array<number> = [1,2,3];

### 元组类型( tuple )

    元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。

```
    // Declare a tuple type
    let x: [string, number];
    // Initialize it
    x = ['hello', 10]; // OK
    // Initialize it incorrectly
    x = [10, 'hello']; // Error
```
### 枚举类型(enum)

    enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字

    enum Color {Red, Green, Blue}
    let c: Color = Color.Green;

### 任意类型(any)

```
    let notSure: any = 4;
    notSure = "maybe a string instead";
    notSure = false; // okay, definitely a boolean
```

### void类型

    某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：  
```
    function warnUser(): void {
        console.log("This is my warning message");
    }
``` 

### null和undefined类型

    TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大：

    let u: undefined = undefined;
    let n: null = null;

### never类型

    never是其他类型（包括null和undefined）的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

```
    // 返回never的函数必须存在无法达到的终点
    function error(message: string): never {
        throw new Error(message);
    }

    // 推断的返回值类型为never
    function fail() {
        return error("Something failed");
    }

    // 返回never的函数必须存在无法达到的终点
    function infiniteLoop(): never {
        while (true) {
        }
    }
```
