import styles from '../styles/Row.module.css'
import Folder from "@material-ui/icons/Folder";
import DescriptionIcon from "@material-ui/icons/Description";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import { useState } from "react";
import classnames from "classnames";

export default function Row({item}: any) {
  
  const [isCollapsed, setIsCollapsed] = useState(true);
  if(!item) return null;
  if(item.length) {
    return (
      item.map((item: any, index: number) => <Row item={item} key={index}/>)
    )
  }
  const entityIcon = item.type == "folder" ? (
    isCollapsed ? (
      <Folder className={styles.folder} />
    ) : (
      <FolderOpenIcon className={styles.folderOpen} />
    )
  ) : (
    <DescriptionIcon className={styles.file} />
  );
  const formatBytes = (bytes: any, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  return (
    <div key={`section-${item.id}`}>
      <div
        className={styles.row}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {item.type != "folder" ? null : (
          <ChevronRightIcon
          className={classnames(!isCollapsed ? styles.rotated : null)}
          />
        )}
        {entityIcon} {item.name} {item.size && formatBytes(item.size)}
        <span className={styles.text}>{item.text}</span>
      </div>
      {!isCollapsed && item.children &&
      <div
        className={styles.children}
      >
        <Row item={item.children}/>
      </div>
      }
    </div>
  );
}
