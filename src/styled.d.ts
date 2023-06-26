import "styled-components";
/*
    typescript 에서 theme 에 대해 styped-components 인터페이스 정의
    https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html
    Modules.d.ts 로 정의

    styled-components 모듈를 선언(재선언) DefaultTheme 에 대한 Typescript 재정의
*/
declare module "styled-components" {
    export interface DefaultTheme {
      red: string;
      black: {
        veryDark: string;
        darker: string;
        lighter: string;
      };
      white: {
        darker: string;
        lighter: string;
      };
    }
  }