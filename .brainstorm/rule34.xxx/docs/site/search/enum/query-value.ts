/** The possible properties to query post values. */
export declare enum QueryValueKey {
    Hash = "md5",
    User = "user",
    Rating = "rating",
    Width = "width",
    Height = "height",
    Id = "id",
    Parent = "parent",
    Score = "score"
}

/** The possible comparisons to query post values. */
export declare enum QueryValueComparison {
    EqualTo = "=",
    GreaterThan = ">",
    GreaterThanOrEqualTo = ">=",
    LessThan = "<",
    LessThanOrEqualTo = "<=",
}
