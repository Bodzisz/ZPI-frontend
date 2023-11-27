export interface MyComment {
    id: number;
    attractionId: number;
    comment: string;
    username: string;
  }

  export interface NewMyComment {
    id?: number;
    attractionId: number;
    comment: string;
    login: string;
  }

export interface Rating{
  rating: number;
  username: string;
  attractionId: number;
}

export interface NewRating{
  rating: number;
  login: string;
  attractionId: number;
}

export interface RatingList{
  ratings: Rating[];
}

  export interface CommentList {
    comments: MyComment[];

  }