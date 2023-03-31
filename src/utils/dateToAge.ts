export function dateToAge(birthday: string) {
  const birthdayDate = new Date(birthday);

  let ageDifMs = Date.now() - birthdayDate.getTime();
  let ageDate = new Date(ageDifMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
