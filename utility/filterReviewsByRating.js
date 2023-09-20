export default function filterReviewsByRating(reviews, targetRating) {
  if (!Array.isArray(reviews)) {
    throw new Error('Reviews should be an array.');
  }

  targetRating = Number(targetRating[0]);

  if (typeof targetRating !== 'number' || targetRating < 1 || targetRating > 5) {
    throw new Error('Invalid target rating. Target rating should be between 1 and 5.');
  }

  return reviews.filter((review) => {
    const rating = Math.floor(review.rating);
    return rating === targetRating;
  });
}
