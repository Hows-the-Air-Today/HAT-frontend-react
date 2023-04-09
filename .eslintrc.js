// .eslintrc.js
module.exports = {
  // 현재 eslintrc 파일을 기준으로 ESLint 규칙을 적용
  root: true,

  // 추가적인 규칙들을 적용
  extends: [
    "airbnb",
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:storybook/recommended",
    // prettier 구문이 배열의 가장 마지막에 위치해야 함
    "plugin:prettier/recommended",
  ],

  // 코드 정리 플러그인 추가
  plugins: ["react", "prettier", "@typescript-eslint"],

  // linter가 파일을 분석할 때, 미리 정의된 전역변수에 무엇이 있는지 명시하는 속성
  env: {
    es6: true,
    // 브라우저의 document와 같은 객체 사용 여부
    browser: false,
    jest: true,
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },

  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {
        directory: "./src",
      },
      react: {
        version: "latest",
      },
    },
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
  },

  // eslint가 무시할 디렉토리, 파일을 설정
  ignorePatterns: ["node_modules/", "dist/"],

  // 사용자 편의 규칙 추가
  rules: {
    // 일치 연산자 사용 필수
    eqeqeq: "warn",
    // var 금지
    "no-var": "warn",
    // 사용하지 않는 변수 금지
    "no-unused-vars": "warn",
    // 콘솔 로그 사용 가능
    "no-console": "off",
    // 여러 줄 공백 금지
    "no-multiple-empty-lines": "warn",
    // 함수형 컴포넌트 정의 방식
    "react/function-component-definition": [
      2,
      { namedComponents: ["arrow-function", "function-declaration"] },
    ],
    "react/no-unescaped-entities": "off",
    // prop-types off
    "react/require-default-props": "off",
    // state, prop 등에 구조분해 할당 적용
    "react/destructuring-assignment": "warn",
    // state 직접 수정 금지
    "react/no-direct-mutation-state": "warn",
    // 사용되지 않는 state 경고
    "react/no-unused-state": "warn",
    // 셀프 클로징 태그 강제
    "react/self-closing-comp": "warn",
    // 반복문으로 생성하는 요소에 key 강제
    "react/jsx-key": "warn",
    // 컴포넌트 이름은 PascalCase로
    "react/jsx-pascal-case": "warn",
    // 불필요한 fragment 금지
    "react/jsx-no-useless-fragment": "warn",
    // jsx 내 불필요한 중괄호 금지
    "react/jsx-curly-brace-presence": "warn",
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-parameter-properties": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "import/export": "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["sibling", "parent", "index"],
          "type",
          "unknown",
        ],
        pathGroups: [
          {
            pattern: "{react*,react*/**}",
            group: "external",
            position: "before",
          },
          {
            pattern: "@saas-fe/**/*.style",
            group: "unknown",
          },
          {
            pattern: "@pages/**/*.style",
            group: "unknown",
          },
          {
            pattern: "@components/**/*.style",
            group: "unknown",
          },
          {
            pattern: "./**/*.style",
            group: "unknown",
          },
          {
            pattern: "../**/*.style",
            group: "unknown",
          },
          {
            pattern: "*.style",
            group: "unknown",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "unknown"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        json: "never",
      },
    ],
    "prettier/prettier": [
      "error",
      // 아래 규칙들은 개인 선호에 따라 prettier 문법 적용
      // https://prettier.io/docs/en/options.html
      {
        singleQuote: false,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: "es5",
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: "always",
        importOrder: ["^@/(.*)$", "^[./]"],
        importOrderParserPlugins: ["typescript", "decorators-legacy"],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
      },
    ],
  },
};
