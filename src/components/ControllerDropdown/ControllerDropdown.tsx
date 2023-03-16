import { Dispatch, SetStateAction, useState } from "react";
import { Button, Checkbox, Chip, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Category = {
  label: string;
  value: string;
  checked?: boolean;
};

type SubCategory = {
  title: string;
  subcategory: Category[];
};

interface IProps {
  subCategories: SubCategory;
  setSubCategories: Dispatch<SetStateAction<SubCategory>>;
  singleValue?: boolean;
}

export function ControllerDropdown({
  subCategories,
  setSubCategories,
  singleValue = false,
}: IProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subCategory, setSubCategory] = useState<SubCategory["subcategory"]>(
    subCategories.subcategory || []
  );
  const [selectedElements, setSelectedElements] = useState<
    SubCategory["subcategory"]
  >([]);

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedElements(
      subCategory.filter((subcategory) => subcategory.checked)
    );
  };

  const handleSubCategoryChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSubCategory = [...subCategory];
      if (singleValue) {
        // if singleValue is true, only allow selecting one item at a time
        newSubCategory.forEach((subcategory, i) => {
          if (index !== i) {
            subcategory.checked = false;
          } else {
            subcategory.checked = event.target.checked;
          }
        });
      } else {
        // if singleValue is false, allow selecting multiple items
        newSubCategory[index].checked = event.target.checked;
      }
      setSubCategory(newSubCategory);
      setSubCategories({ ...subCategories, subcategory: subCategory });
    };

  const handleSubCategoryDelete = (value: string) => () => {
    const newSubCategories = [...subCategory];
    const categoryIndex = newSubCategories.findIndex(
      (subcategory) => subcategory.value === value
    );
    newSubCategories[categoryIndex].checked = false;
    setSubCategory(newSubCategories);
    setSelectedElements(
      selectedElements.filter(
        (subcategory: Category) => subcategory.value !== value
      )
    );
    setSubCategories({ ...subCategories, subcategory: subCategory });
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div>
        <Button
          sx={{
            border: "1px solid #505050",
            color: "#505050",
            marginBottom: ".5rem",
          }}
          onClick={handleOpenMenu}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {subCategories.title}
        </Button>
      </div>
      {selectedElements.map((subcategory: Category) => (
        <Chip
          sx={{
            marginTop: "5px",
            marginLeft: "5px",
          }}
          key={subcategory.value}
          label={subcategory.label}
          onDelete={handleSubCategoryDelete(subcategory.value)}
        />
      ))}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        MenuListProps={{
          style: {
            paddingRight: "14px",
          },
        }}
      >
        {subCategory.map((subcategory: Category, index: number) => (
          <MenuItem key={subcategory.value}>
            <Checkbox
              checked={subcategory.checked}
              onChange={handleSubCategoryChange(index)}
            />
            {subcategory.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
