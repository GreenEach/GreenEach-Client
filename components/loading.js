import { Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import React from "react";

class Loading extends React.Component {
  state = {
    loadings: [],
  };

  enterLoading = (index) => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);
  };

  render() {
    const { loadings } = this.state;
    return (
      <Button
        // type="primary"
        loading={loadings[0]}
        onClick={() => this.enterLoading(0)}
      >
        Click me!
      </Button>
    );
  }
}

export default Loading;
