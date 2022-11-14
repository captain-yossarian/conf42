type MAXIMUM_ALLOWED_BOUNDARY = 50
// https://catchts.com/range-numbers
type ComputeDigitRange<
    N extends number,
    Result extends Array<unknown> = [],
> =
    (Result['length'] extends N
        ? Result
        : ComputeDigitRange<N, [...Result, Result['length']]>
    )

type TestDigits = ComputeDigitRange<10>


type Separator = ';'
type Coordinates = `${number},${number}${Separator}`

// https://catchts.com/even-length#recursive_pattern

type Last<T extends string[]> = T extends [...infer _, infer Last] ? Last : never;

type ConcatPrevious<T extends any[]> = Last<T> extends string ? `${Last<T>}${Coordinates}` : never

/**
 * Creates required union
 */
type ComputeCoordinates<
    N extends number,
    Result extends Array<unknown> = [Coordinates],
> =
    (Result['length'] extends N
        ? Result[number]
        : ComputeCoordinates<N, [...Result, ConcatPrevious<Result>]>
    )

type MyLocation = ComputeCoordinates<10>

// https://catchts.com/rest-tuples