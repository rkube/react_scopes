

type items_t = {
    index: number,
    shot: number,
    type: type_e,
}


// Definition for dictionary with enum key
type enum_dict<T extends string | symbol | number, U> = {
    [K in T]: U;
};

// Allowed types for type
enum type_e {Type1, Type2, Type3}

// String representation of the Types in the enum dict
const type_string_repr: enum_dict<type_e, string> = {
    [type_e.Type1]: "Type_1",
    [type_e.Type2]: "Type_2",
    [type_e.Type3]: "Type_3",
}

// String representation of an items_t
const to_str = (it: items_t) => {
    return(it.shot.toString() + " " + type_string_repr[it.type])
}


export {type_e, type items_t, type_string_repr, to_str}