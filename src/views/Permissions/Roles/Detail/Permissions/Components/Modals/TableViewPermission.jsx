import ClearIcon from "@mui/icons-material/Clear";
import { Box, Card, Modal, Typography } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import TableCard from "../../../../../../../components/TableCard";
import {
  CTable,
  CTableBody,
  CTableCell,
  CTableHead,
  CTableHeadRow,
} from "../../../../../../../components/CTable";
import FormCheckbox from "../Checkbox/FormCheckbox";

const TableViewPermission = ({ closeModal, control, tableIndex }) => {
  const basePath = `data.tables.${tableIndex}.table_view_permissions`;

  const { fields } = useFieldArray({
    control,
    name: basePath,
    keyName: "key",
  });

  return (
    <div>
      <Modal open className="child-position-center" onClose={closeModal}>
        <Card className="PlatformModal">
          <div className="modal-header silver-bottom-border">
            <Typography variant="h4">Tableview permissions</Typography>
            <ClearIcon
              color="primary"
              onClick={closeModal}
              width="46px"
              style={{
                cursor: "pointer",
              }}
            />
          </div>
          <Box>
            <TableCard withBorder borderRadius="md">
              <CTable
                tableStyle={{
                  height: "auto",
                }}
              >
                <CTableHead>
                  <CTableHeadRow>
                    <CTableCell w={2}>No</CTableCell>
                    <CTableCell w={250}>Label</CTableCell>
                    <CTableCell w={150}>View</CTableCell>
                    <CTableCell w={150}>Edit</CTableCell>
                    <CTableCell w={150}>Delete</CTableCell>
                  </CTableHeadRow>
                </CTableHead>
                <CTableBody columnsCount={3} dataLength={fields?.length}>
                  {fields?.map((field, fieldIndex) => (
                    <CTableHeadRow key={field.guid}>
                      <CTableCell>{fieldIndex + 1}</CTableCell>
                      <CTableCell>{field.name}</CTableCell>
                      <CTableCell>
                        <FormCheckbox
                          name={`${basePath}.${fieldIndex}.view`}
                          control={control}
                        />
                      </CTableCell>

                      <CTableCell>
                        <FormCheckbox
                          name={`${basePath}.${fieldIndex}.edit`}
                          control={control}
                        />
                      </CTableCell>

                      <CTableCell>
                        <FormCheckbox
                          name={`${basePath}.${fieldIndex}.delete`}
                          control={control}
                        />
                      </CTableCell>
                    </CTableHeadRow>
                  ))}
                </CTableBody>
              </CTable>
            </TableCard>
          </Box>
        </Card>
      </Modal>
    </div>
  );
};

export default TableViewPermission;
