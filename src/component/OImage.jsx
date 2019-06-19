import { Icon, Button, Tree} from 'antd';
import { Dialog } from 'zent';
import React, { Component } from 'react';
const styles = {
  warp:{
    width: '760px', 
    height: '400px', 
    display: 'inline-block',
    border: '1px solid #ccc' 
  },
  folderContain:{
    // boxSizing:'border-box',
    width: '200px',
    height: '300px',
    float: 'left' ,
    display: 'inline-block',
    border: '1px solid #ccc'
  },
  folderPicture:{
    // boxSizing:'border-box',
    width: '550px',
    height: '300px', 
    display: 'inline-block',
    border: '1px solid #ccc',
    float: 'right' 
  },
  // folderUpload:{
  //   border:'1px solid #ccc',
  //   width:'100px',
  //   height:'45px',
  //   borderRadius:'3px',
  //   lineHeight:'45px',
  //   textAlign:'center'
  // }
}
const TreeNode = Tree.TreeNode;
/*const DirectoryTree = Tree.DirectoryTree;*/
class OImage extends Component {
  constructor() {
    super();
    this.state = {
      fileTopology: null,
      visible: false,
      selectedKeys:null,
      Picture:[],
    }
  }

  static get Action() {
    let domain = 'http://localhost:8090/WCP.Service/wcp/';
    return {
      UploadFile: domain + 'uploadFile/'
    }
  }

  triggerDialog = (visible) => {
    this.setState({ visible}, () => {

    });
  };

  renderFileTreeNodes = (data) => {
    return data.map((item) => {
      if (!item.isDirectory) {
        return null;
      }
      if (item.children) {
        return (
          <TreeNode  title={item.name} key={item.key} dataRef={item}>
            {this.renderFileTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.key} dataRef={item} />;
    });
  }

  render() {
    return (
      <span>
        <Button onClick={() => this.triggerDialog(true)}>
          <Icon type="picture" style={{ fontSize: '18px' }} />
        </Button>
        <Dialog visible={this.state.visible} onClose={() => this.triggerDialog(false)}
          title="图片资源管理">
          <div style={styles.warp}>
            <div  style={styles.folderContain}>

            </div>

          </div>
        </Dialog>
      </span>
    );
  }
}
export default OImage