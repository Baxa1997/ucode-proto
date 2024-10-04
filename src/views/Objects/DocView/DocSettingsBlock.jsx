import ExportBlock from "./ExportBlock";
import PageSizeBlock from "./PageSizeBlock";
import styles from "./style.module.scss";

const DocSettingsBlock = ({
  selectedSettingsTab,
  exportToPDF,
  pdfLoader,
  selectedPaperSizeIndex,
  setSelectedPaperSizeIndex,
  htmlLoader,
  exportToHTML,
  setSelectedOutputTable,
  selectedOutputTable,
  selectedOutputObject,
  setSelectedOutputObject,
  templates,
  selectedTemplate,
  selectedLinkedObject,
  setSelectedLinkedObject,
  relationViewIsActive,
  setlLinkedObjectView,
  setSelectedObject,
  selectedObject,
  isChecked,
}) => {
  return (
    <div className={styles.docSettingsBlock}>
      {selectedSettingsTab === 0 && (
        <PageSizeBlock
          selectedPaperSizeIndex={selectedPaperSizeIndex}
          setSelectedPaperSizeIndex={setSelectedPaperSizeIndex}
        />
      )}
      {selectedSettingsTab === 1 && (
        <ExportBlock
          exportToPDF={exportToPDF}
          pdfLoader={pdfLoader}
          htmlLoader={htmlLoader}
          exportToHTML={exportToHTML}
          setSelectedOutputTable={setSelectedOutputTable}
          selectedOutputTable={selectedOutputTable}
          selectedOutputObject={selectedOutputObject}
          setSelectedOutputObject={setSelectedOutputObject}
          templates={templates}
          selectedTemplate={selectedTemplate}
          selectedLinkedObject={selectedLinkedObject}
          setSelectedLinkedObject={setSelectedLinkedObject}
          relationViewIsActive={relationViewIsActive}
          setlLinkedObjectView={setlLinkedObjectView}
          setSelectedObject={setSelectedObject}
          selectedObject={selectedObject}
          isChecked={isChecked}
        />
      )}
    </div>
  );
};

export default DocSettingsBlock;
