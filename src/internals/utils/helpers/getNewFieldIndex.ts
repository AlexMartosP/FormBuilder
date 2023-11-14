export default function getNewFieldIndex(
  movingFieldIndex: number,
  targetFieldIndex: number,
  extraFieldsCount?: number
) {
  if (movingFieldIndex < targetFieldIndex) {
    return targetFieldIndex + (extraFieldsCount ?? 0) - 1;
  }

  return targetFieldIndex;
}
