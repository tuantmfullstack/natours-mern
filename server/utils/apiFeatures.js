class ApiFeature {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter() {
    let queryStr = { ...this.queryObj };
    const excludedFields = ['fields', 'page', 'sort', 'limit'];

    excludedFields.forEach((field) => delete queryStr[field]);

    queryStr = JSON.parse(
      JSON.stringify(queryStr).replace(
        /\b(gte|gt|lte|lt)\b/,
        (match) => `$${match}`
      )
    );

    this.query = this.query.find(queryStr);
    return this;
  }

  sort() {
    if (this.queryObj.sort) {
      const sortBy = this.queryObj.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  fields() {
    if (this.queryObj.fields) {
      const selectBy = this.queryObj.fields.split(',').join(' ');
      this.query = this.query.select(selectBy);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  page() {
    if (this.queryObj.page) {
      const limit = +this.queryObj.limit;
      const page = +this.queryObj.page >= 1 ? +this.queryObj.page : 1;
      const skip = (page - 1) * limit;

      this.query = this.query.skip(skip).limit(limit);
    } else {
      this.query = this.query.skip(0).limit(10);
    }
    return this;
  }
}

export default ApiFeature;
