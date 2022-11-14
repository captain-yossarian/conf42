type ComputeRange<
    N extends number,
    Result extends Array<unknown> = [],
> =
    (Result['length'] extends N
        ? Result[number]
        : ComputeRange<N, [...Result, Result['length']]>
    )

type HexNumber = `${ComputeRange<10>}`

type Chars =
    | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'

type HexString = Chars | Uppercase<Chars>

type Hex = `${HexNumber}` | HexString;

type StringLength<
    Str extends string,
    Acc extends string[] = []
> =
    (Str extends `${infer S}${infer Rest}`
        ? StringLength<Rest, [...Acc, S]>
        : Acc['length'])

type ValidateLength<
    Str extends string,
    Length extends number
> =
    (StringLength<Str> extends Length
        ? Str
        : never)

type ValidateHex<
    Color extends string,
    Cache extends string = '',
> =
    Color extends `${infer A}${infer Rest}`
    ? (A extends ''
        ? Cache
        : (A extends Hex
            ? ValidateHex<Rest, `${Cache}${A}`>
            : never)
    ) : Cache


type ValidateMap<T extends Record<string, string>> = {
    [Prop in keyof T]:
    & T[Prop]
    & ValidateHex<T[Prop]>
    & ValidateLength<T[Prop], 6 | 3>
}

type AddHash<T extends Record<string, string>> = {
    [Prop in keyof T]: `#${T[Prop]}`
}

const color = <
    Key extends string,
    Value extends string,
    ColorMap extends Record<Key, Value>
>(dictionary: AddHash<ValidateMap<ColorMap>>) => dictionary


const colorTheme = color({
    /**
     * Ok
     */
    white: '#ffffff', // ok
    gray: '#e2e2e2', // ok
    anyColor: '#ddd', // ok
    /**
     * Error
     */
    green: '#ffx', // expected error,
    foo: '#___', // expected error
    bar: '#www' // expected error
})


colorTheme.gray // '#e2e2e2'