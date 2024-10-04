import FRow from "../../../../../../components/FormElements/FRow";
import HFNumberField from "../../../../../../components/FormElements/HFNumberField";
import HFTextField from "../../../../../../components/FormElements/HFTextField";

const CodabarIncrements = ({ control }) => {
  return (
    <>
      <div className="p-2">
        <FRow label="Prefix">
          <HFTextField name="attributes.prefix" control={control} fullWidth />
        </FRow>

        <FRow label="Digit number">
          <HFNumberField
            name="attributes.digit_number"
            control={control}
            fullWidth
          />
        </FRow>
      </div>
    </>
  );
};

export default CodabarIncrements;
