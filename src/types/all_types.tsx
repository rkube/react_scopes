

type items_t = {
    index: number,
    shot: number,
    title: string,
    type: type_e,
}


// Definition for dictionary with enum key
type enum_dict<T extends string | symbol | number, U> = {
    [K in T]: U;
};

// Allowed types for type
enum type_e {Type1, Type2, Type3}

const type_string_repr: enum_dict<type_e, string> = {
    [type_e.Type1]: "Type 1!!",
    [type_e.Type2]: "Type 2!!",
    [type_e.Type3]: "Type 3!!",
}



export {type_e, type items_t, type_string_repr}