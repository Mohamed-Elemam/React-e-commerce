export class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  //filter
  filter() {
    const queryInstance = { ...req.query };
    const execuldeKeysArr = ["page", "sort", "fields", "keyword"];
    execuldeKeysArr.forEach((key) => delete queryInstance[key]);
    const filterObj = JSON.parse(
      JSON.stringify(queryInstance).replace(
        /gt|gte|lt|lte|in|nin|eq|neq|regex/g,
        (match) => `$${match}`
      )
    );
    this.mongooseQuery.find(filterObj);
    return this;
  }

  //pagination
  paginate() {
    let pageNumber = this.queryString.page * 1 || 1;
    if (this.queryString.page <= 0) page = 1;
    let pageLimit = 3;
    let skip = (pageNumber - 1) * pageLimit;
    this.mongooseQuery.skip(skip).limit(5);
    return this;
  }

  // sort
  sort() {
    if (this.queryString.sort) {
      let sortedBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortedBy);
    }
    return this;
  }

  //  search
  search() {
    if (this.queryString.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { desc: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  // fields
  select() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }

    return this;
  }
}
