import {
  DropdownContainer,
  SelectedOptionButton,
  OptionItem,
  OptionsList,
} from "./adminOrdersCard.styled";
import { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const StatusDropdown = ({ status, changeStatusHandler, id, orderId }) => {
  const statusColors = {
    "Order Placed": "#007bff",
    Processing: "#ffc107",
    Shipped: "#28a745",
    "Out for Delivery": " #ff6c5c",
    Delivered: "#6c757d",
    Returned: "#FF62A5",
    Cancelled: "#dc3545",
    Refunded: "#6610f2",
  };

  const options = [
    { label: "Order Placed", color: "#007bff" },
    { label: "Processing", color: "#ffc107" },
    { label: "Shipped", color: "#28a745" },
    { label: "Out for Delivery", color: "#ff6c5c" },
    { label: "Delivered", color: "#6c757d" },
    { label: "Returned", color: "#FF62A5" },
    { label: "Cancelled", color: "#dc3545" },
    { label: "Refunded", color: "#6610f2" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    label: status,
    color: statusColors[status],
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    changeStatusHandler({
      status: option.label,
      prodObjId: id,
      orderId,
    });
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <SelectedOptionButton
        onClick={toggleDropdown}
        $bgColor={selectedOption?.color}
      >
        {selectedOption?.label}
        {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </SelectedOptionButton>
      {isOpen && (
        <OptionsList>
          {options
            .filter((option) => option.label !== status)
            .map((option, index) => (
              <OptionItem
                key={index}
                onClick={() => handleOptionClick(option)}
                style={{ backgroundColor: option.color }}
              >
                {option.label}
              </OptionItem>
            ))}
        </OptionsList>
      )}
    </DropdownContainer>
  );
};

export default StatusDropdown;
