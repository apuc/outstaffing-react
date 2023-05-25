import React from "react";
import { useSelector, useDispatch } from "react-redux";

import OutstaffingBlock from "../OutstaffingBlock/OutstaffingBlock";
import TagSelect from "../Select/TagSelect";
import {
  selectTags,
  getPositionId,
  setPositionId,
} from "../../redux/outstaffingSlice";

import front from "../../assets/images/partnerProfile/front-end.webp";
import back from "../../assets/images/partnerProfile/back-end.webp";
import design from "../../assets/images/partnerProfile/design.webp";

import "./outstaffing.scss";

const createSelectPositionHandler =
  ({ positionId, setPositionId, dispatch }) =>
  (id) => {
    if (id === positionId) {
      dispatch(setPositionId(null));
    } else {
      dispatch(setPositionId(id));
    }
  };

const Outstaffing = () => {
  const dispatch = useDispatch();
  const positionId = useSelector(getPositionId);
  const tagsArr = useSelector(selectTags);

  const onSelectPosition = createSelectPositionHandler({
    positionId,
    setPositionId,
    dispatch,
  });
  return (
    <>
      <section className="outstaffing">
        <div className="row">
          <div className="col-12 col-xl-4">
            <OutstaffingBlock
              dataTags={
                tagsArr &&
                tagsArr.flat().filter((tag) => tag.name === "skills_front")
              }
              img={front}
              header="Frontend разработчики"
              positionId="2"
              isSelected={positionId === "2"}
              onSelect={(id) => onSelectPosition(id)}
            />
          </div>
          <div className="col-12 col-xl-4">
            <OutstaffingBlock
              dataTags={
                tagsArr &&
                tagsArr.flat().filter((tag) => tag.name === "skills_back")
              }
              img={back}
              header="Backend разработчики"
              positionId="1"
              isSelected={positionId === "1"}
              onSelect={(id) => onSelectPosition(id)}
            />
          </div>
          <div className="col-12 col-xl-4">
            <OutstaffingBlock
              dataTags={
                tagsArr &&
                tagsArr.flat().filter((tag) => tag.name === "skills_design")
              }
              img={design}
              header="Дизайн проектов"
              positionId="5"
              isSelected={positionId === "5"}
              onSelect={(id) => onSelectPosition(id)}
            />
          </div>
        </div>
      </section>
      <TagSelect />
    </>
  );
};

export default Outstaffing;
