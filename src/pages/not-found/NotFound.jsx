import * as S from "./NotFound.styled";

const NotFound = () => {
  return (
    <S.Page>
      <S.Container>
        <S.CodeRow aria-hidden>
          <S.Digit>4</S.Digit>
          <S.Digit>0</S.Digit>
          <S.Digit>4</S.Digit>
        </S.CodeRow>

        <S.Message>Sorry, we couldn't find this page.</S.Message>

        <S.BackButton to="/">Back to home</S.BackButton>
      </S.Container>
    </S.Page>
  );
};

export default NotFound;