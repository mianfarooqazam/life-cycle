'use client';

import { useState, useEffect } from 'react';
import { calculatePlotArea } from '@/app/utils/buildingPlanCalc';
import SaveButton from '@/app/components/button/SaveButton';
import { useBuildingPlanStore } from '@/app/store/buildingPlanStore';
import TitleHeader from '@/app/components/header/TitleHeader';
import TextInput from '@/app/components/input/TextInput';
import {
   FormControl,
   RadioGroup,
   FormControlLabel,
   Radio,
   FormLabel
} from '@mui/material';

export default function BuildingPlan() {
   const {
       projectName,
       address,
       plotSize,
       marlaSize,
       isBasementUsed,
       foundationType,
       excavatorType,
       numberOfFloors,
       numberOfRooms,
       numberOfKitchens,
       numberOfWashrooms,
       numberOfLounges,
       updateBuildingPlan
   } = useBuildingPlanStore();

   const [formData, setFormData] = useState({
       projectName: projectName || '',
       address: address || '',
       plotSize: plotSize || '',
       marlaSize: marlaSize || 272,
       isBasementUsed: isBasementUsed || 'no',
       foundationType: foundationType || '',
       excavatorType: excavatorType || 'Crawler Excavation',
       numberOfFloors: numberOfFloors || '',
       numberOfRooms: numberOfRooms || '',
       numberOfKitchens: numberOfKitchens || '',
       numberOfWashrooms: numberOfWashrooms || '',
       numberOfLounges: numberOfLounges || ''
   });

   useEffect(() => {
       setFormData({
           projectName: projectName || '',
           address: address || '',
           plotSize: plotSize || '',
           marlaSize: marlaSize || 272,
           isBasementUsed: isBasementUsed || 'no',
           foundationType: foundationType || '',
           excavatorType: excavatorType || 'Crawler Excavation',
           numberOfFloors: numberOfFloors || '',
           numberOfRooms: numberOfRooms || '',
           numberOfKitchens: numberOfKitchens || '',
           numberOfWashrooms: numberOfWashrooms || '',
           numberOfLounges: numberOfLounges || ''
       });
   }, [projectName, address, plotSize, marlaSize, isBasementUsed, foundationType, excavatorType,
       numberOfFloors, numberOfRooms, numberOfKitchens, numberOfWashrooms, numberOfLounges]);

   const handleInputChange = (e) => {
       const { name, value } = e.target;
       setFormData(prev => ({ ...prev, [name]: value }));
   };

   const getFloorsHelperText = (numberOfFloors) => {
       const floors = parseInt(numberOfFloors);
       if (!floors || floors <= 0) return '';
       
       const floorNames = [];
       
       floorNames.push('Ground Floor');
       
       if (floors <= 3) {
           for (let i = 1; i < floors; i++) {
               const suffix = i === 1 ? 'st' : i === 2 ? 'nd' : i === 3 ? 'rd' : 'th';
               floorNames.push(`${i}${suffix} Floor`);
           }
           return `(${floorNames.join(', ')})`;
       } else {
           const lastFloorIndex = floors - 1;
           const suffix = lastFloorIndex === 1 ? 'st' : 
                         lastFloorIndex === 2 ? 'nd' : 
                         lastFloorIndex === 3 ? 'rd' : 'th';
           
           return `(Ground Floor --- ${lastFloorIndex}${suffix} Floor)`;
       }
   };

   const validateBuildingDetails = () => {
       return formData.numberOfFloors && 
              formData.numberOfRooms && 
              formData.numberOfKitchens && 
              formData.numberOfWashrooms && 
              formData.numberOfLounges;
   };

   const handleSave = () => {
       if (!formData.plotSize || !formData.marlaSize || !formData.isBasementUsed) {
           return false;
       }
       if (formData.isBasementUsed === 'yes' && !formData.foundationType) {
           return false;
       }
       if (!validateBuildingDetails()) {
           return false;
       }
       const plotArea = calculatePlotArea(parseFloat(formData.plotSize), parseInt(formData.marlaSize));
       updateBuildingPlan({
           ...formData,
           marlaSize: parseInt(formData.marlaSize),
           numberOfFloors: formData.numberOfFloors ? parseInt(formData.numberOfFloors) : 0,
           numberOfRooms: formData.numberOfRooms ? parseInt(formData.numberOfRooms) : 0,
           numberOfKitchens: formData.numberOfKitchens ? parseInt(formData.numberOfKitchens) : 0,
           numberOfWashrooms: formData.numberOfWashrooms ? parseInt(formData.numberOfWashrooms) : 0,
           numberOfLounges: formData.numberOfLounges ? parseInt(formData.numberOfLounges) : 0,
           plotArea
       });
       return true;
   };

   const getErrorMessage = () => {
       if (!formData.plotSize || !formData.marlaSize || !formData.isBasementUsed) {
           return "Plot size, marla size, and basement options are required!";
       }
       if (formData.isBasementUsed === 'yes' && !formData.foundationType) {
           return "Foundation type is required when basement is used!";
       }
       if (!validateBuildingDetails()) {
           return "floors, rooms, kitchens, washrooms and lounges are required!";
       }
       return "Please fill all required fields!";
   };

   const plotArea = formData.plotSize && formData.marlaSize
       ? calculatePlotArea(parseFloat(formData.plotSize), parseInt(formData.marlaSize))
       : 0;

   const marlaOptions = [
       { value: 252, label: '252 sq ft' },
       { value: 272, label: '272 sq ft' }
   ];

   const excavatorOptions = [
       {
           value: "Crawler Excavation", label: "Crawler Excavation"
       }
   ];

   return (
       <div className="grid grid-cols-1 gap-6 p-2">
           <TitleHeader>Building Plan</TitleHeader>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <TextInput
                   label="Project Name"
                   name="projectName"
                   value={formData.projectName}
                   onChange={handleInputChange}
               />
               <TextInput
                   label="Address"
                   name="address"
                   value={formData.address}
                   onChange={handleInputChange}
               />
               <TextInput
                   label="Plot Size"
                   name="plotSize"
                   type="number"
                   value={formData.plotSize}
                   onChange={handleInputChange}
                   required
               />
               <TextInput
                   label="Marla Size"
                   name="marlaSize"
                   value={formData.marlaSize}
                   onChange={handleInputChange}
                   options={marlaOptions}
                   required
               />
           </div>
           {formData.plotSize && formData.marlaSize && (
               <div className="grid grid-cols-1">
                   <div className="p-4 rounded-md" style={{ backgroundColor: "#f7f6fb" }}>
                       <p className="text-lg font-bold text-gray-800">
                           Plot Area: <span className="text-blue-600">{plotArea.toLocaleString()} ft²</span>
                       </p>
                   </div>
               </div>
           )}
           {formData.plotSize && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <FormControl component="fieldset">
                       <FormLabel component="legend">Is basement used?</FormLabel>
                       <RadioGroup
                           row
                           name="isBasementUsed"
                           value={formData.isBasementUsed}
                           onChange={handleInputChange}
                       >
                           <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                           <FormControlLabel value="no" control={<Radio />} label="No" />
                       </RadioGroup>
                   </FormControl>
                   {formData.isBasementUsed === 'yes' && (
                       <FormControl component="fieldset">
                           <FormLabel component="legend">Foundation Type</FormLabel>
                           <RadioGroup
                               row
                               name="foundationType"
                               value={formData.foundationType}
                               onChange={handleInputChange}
                           >
                               <FormControlLabel value="raft" control={<Radio />} label="Raft" />
                               <FormControlLabel value="strip" control={<Radio />} label="Strip" />
                           </RadioGroup>
                       </FormControl>
                   )}
               </div>
           )}
           <div className="grid grid-cols-1">
               <TextInput
                   label="Excavator Type"
                   name="excavatorType"
                   value={formData.excavatorType}
                   onChange={handleInputChange}
                   options={excavatorOptions}
               />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <TextInput
                   label="Floors"
                   name="numberOfFloors"
                   type="number"
                   value={formData.numberOfFloors}
                   onChange={handleInputChange}
                   placeholder="excluding basement"
                   helperText={getFloorsHelperText(formData.numberOfFloors)}
                   required
               />
               <TextInput
                   label="Rooms"
                   name="numberOfRooms"
                   type="number"
                   value={formData.numberOfRooms}
                   onChange={handleInputChange}
                   required
                   placeholder="applies to each floor equally"
               />
               <TextInput
                   label="Kitchens"
                   name="numberOfKitchens"
                   type="number"
                   value={formData.numberOfKitchens}
                   onChange={handleInputChange}
                   required
                   placeholder="applies to each floor equally"
               />
               <TextInput
                   label="Washrooms"
                   name="numberOfWashrooms"
                   type="number"
                   value={formData.numberOfWashrooms}
                   onChange={handleInputChange}
                   required
                   placeholder="applies to each floor equally"
               />
               <TextInput
                   label="Lounges"
                   name="numberOfLounges"
                   type="number"
                   value={formData.numberOfLounges}
                   onChange={handleInputChange}
                   required
                   placeholder="applies to each floor equally"
               />
           </div>
           <div className="grid grid-cols-1 justify-items-end">
               <SaveButton
                   onClick={handleSave}
                   successMessage="Building Plan Saved Successfully"
                   errorMessage={getErrorMessage()}
               />
           </div>
       </div>
   );
}