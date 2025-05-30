const getRatingMean = (ratings) => {
  
  let mean = 0;

  if (ratings.length > 0) {
    let sum = 0;
    ratings.map((rating) => {
      sum += rating.grade;
    });
    mean = sum / ratings.length;
  }

  return mean;
};

const getPercentageRating = (ratings) => {
  let fiveStars = 0
  let fourStars = 0
  let threeStars = 0
  let twoStars = 0
  let oneStar = 0

  let fivePercentage = 0
  let fourPercentage = 0
  let threePercentage = 0
  let twoPercentage = 0
  let onePercentage = 0

  if (ratings.length > 0) {
    ratings.map(rating => {
      const grade = Math.floor(rating.grade)

      if (grade == 1) {
        oneStar += 1
      } else if (grade == 2) {
        twoStars += 1
      } else if (grade == 3) {
        threeStars += 1
      } else if (grade == 4) {
        fourStars += 1
      } else if (grade == 5) {
        fiveStars += 1
      }
    })

    
    fivePercentage = (fiveStars / ratings.length) * 100
    fourPercentage = (fourStars / ratings.length) * 100
    threePercentage = (threeStars / ratings.length) * 100
    twoPercentage = (twoStars / ratings.length) * 100
    onePercentage = (oneStar / ratings.length) * 100
  }

  return {fivePercentage, fiveStars, fourPercentage, fourStars, threePercentage, threeStars, twoPercentage, twoStars, onePercentage, oneStar}
}

export { getRatingMean, getPercentageRating };
