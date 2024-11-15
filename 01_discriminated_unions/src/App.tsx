import "./App.css";
import { CustomButton } from "./components/button";

function App() {
  return (
    <>
      <main>
        <CustomButton href="" as="a">
          リンク
        </CustomButton>
        <CustomButton href="" as="button">
          ボタン
        </CustomButton>
      </main>
    </>
  );
}

export default App;
