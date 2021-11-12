import styles from '../styles/Home.module.css'
import Folder from "@material-ui/icons/Folder";
import DescriptionIcon from "@material-ui/icons/Description";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import { useState } from "react";

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
  return (
    <div key={`section-${item.id}`}>
      <div
        className={styles.row}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {item.type != "folder" ? null : (
          <ChevronRightIcon
            className={styles.chevron}
          />
        )}
        {entityIcon} {item.name}
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
