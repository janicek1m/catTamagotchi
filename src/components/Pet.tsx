import { FunctionComponent, useRef, useEffect } from "react";
import moods from "../lib/moods";
import { ReactComponent as Unborn } from "./moods/unborn.svg";
import { ReactComponent as Hatching } from "./moods/hatching.svg";
import { ReactComponent as Happy } from "./moods/happy.svg";
import { ReactComponent as Sleeping } from "./moods/sleeping.svg";
import { ReactComponent as Hungry } from "./moods/hungry.svg";
import { ReactComponent as Fed } from "./moods/fed.svg";
import { ReactComponent as Lonely } from "./moods/lonely.svg";
import { ReactComponent as Petted } from "./moods/petted.svg";
import { ReactComponent as Dirty } from "./moods/dirty.svg";
import { ReactComponent as Cleaned } from "./moods/cleaned.svg";
import { ReactComponent as HungryAndLonely } from "./moods/hungryAndLonely.svg";
import { ReactComponent as HungryAndDirty } from "./moods/hungryAndDirty.svg";
import { ReactComponent as LonelyAndDirty } from "./moods/lonelyAndDirty.svg";
import { ReactComponent as HungryLonelyAndDirty } from "./moods/hungryLonelyAndDirty.svg";
import { ReactComponent as Tired } from "./moods/tired.svg";
import { ReactComponent as Sick } from "./moods/sick.svg";
import { ReactComponent as Dead } from "./moods/dead.svg";

interface PetProps {
  mood: string;
  setJustReceived: (a: boolean) => void;
  lightsOff: boolean;
  age: number;
  lastHealthy: number;
}

const Pet: FunctionComponent<PetProps> = ({
  mood,
  setJustReceived,
  lightsOff,
  age,
  lastHealthy,
}) => {
  // set justReceived based on animation end
  const pet = useRef<HTMLDivElement>(null);
  useEffect(() => {
    pet.current!.onanimationend = () => setJustReceived(false);
  });

  // set pet size according to age
  const ageInDays = Math.round(age / 86400);
  let size;
  let shadowStyle;
  if (ageInDays < 5) size = 2;
  else if (ageInDays >= 5 && ageInDays < 30) size = ageInDays * 0.2333;
  else size = 7;
  if (mood === moods.unborn || mood === moods.hatching) {
    size = 4;
    shadowStyle = { width: `${size / 3}rem`, height: `${size / 20}rem` };
  } else {
    shadowStyle = { width: `${size}rem`, height: `${size / 10}rem` };
  }

  // set css animations
  let className = "alive";
  switch (mood) {
    case moods.unborn:
      className = " ";
      break;
    case moods.hatching:
      className = "hatching";
      break;
    case moods.sleeping:
      className = "sleeping";
      break;
    case moods.sick:
      className = "sick";
      break;
    case moods.dead:
      className = "dead";
      break;
    case moods.fed:
      className = "fed";
      break;
    case moods.petted:
      className = "petted";
      break;
    case moods.cleaned:
      className = "cleaned";
      break;
  }

  const renderCurrentSelection = () => {
    switch (mood) {
      case moods.unborn:
        return <Unborn />;
      case moods.hatching:
        return <Hatching />;
      case moods.happy:
        return <Happy />;
      case moods.sleeping:
        return <Sleeping />;
      case moods.hungry:
        return <Hungry />;
      case moods.fed:
        return <Fed />;
      case moods.lonely:
        return <Lonely />;
      case moods.petted:
        return <Petted />;
      case moods.dirty:
        return <Dirty />;
      case moods.cleaned:
        return <Cleaned />;
      case moods.hungryAndLonely:
        return <HungryAndLonely />;
      case moods.hungryAndDirty:
        return <HungryAndDirty />;
      case moods.lonelyAndDirty:
        return <LonelyAndDirty />;
      case moods.hungryLonelyAndDirty:
        return <HungryLonelyAndDirty />;
      case moods.tired:
        return <Tired />;
      case moods.sick:
        return <Sick />;
      case moods.dead:
        return <Dead />;
      default:
        return <Unborn />;
    }
  };

  return (
    <div className="petContainer">
      <div
        ref={pet}
        id="pet"
        className={className}
        style={{ fontSize: `${size}rem` }}
      >
        {/* {mood} */}
        {renderCurrentSelection()}
      </div>
    </div>
  );
};

export default Pet;
