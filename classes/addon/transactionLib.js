function setTipeButton(tipeButton){
	switch(tipeButton){
		case tbAllFalse :
			system.activeApplication._mainForm.bSimpan.setEnabled(false);
			system.activeApplication._mainForm.bEdit.setEnabled(false);
			system.activeApplication._mainForm.bHapus.setEnabled(false);			
			break;
		case tbAllTrue :
			system.activeApplication._mainForm.bSimpan.setEnabled(true);
			system.activeApplication._mainForm.bEdit.setEnabled(true);
			system.activeApplication._mainForm.bHapus.setEnabled(true);			
			break;
		case tbSimpan :
			system.activeApplication._mainForm.bSimpan.setEnabled(true);
			system.activeApplication._mainForm.bEdit.setEnabled(false);
			system.activeApplication._mainForm.bHapus.setEnabled(false);			
			break;
		case tbUbahHapus :
			system.activeApplication._mainForm.bSimpan.setEnabled(false);
			system.activeApplication._mainForm.bEdit.setEnabled(true);
			system.activeApplication._mainForm.bHapus.setEnabled(true);			
			break;
		case tbHapus :
			system.activeApplication._mainForm.bSimpan.setEnabled(false);
			system.activeApplication._mainForm.bEdit.setEnabled(false);
			system.activeApplication._mainForm.bHapus.setEnabled(true);			
			break;
		case tbSimpanHapus :
			system.activeApplication._mainForm.bSimpan.setEnabled(true);
			system.activeApplication._mainForm.bEdit.setEnabled(false);
			system.activeApplication._mainForm.bHapus.setEnabled(true);			
			break;	
		case tbUbah :
			system.activeApplication._mainForm.bSimpan.setEnabled(false);
			system.activeApplication._mainForm.bEdit.setEnabled(true);
			system.activeApplication._mainForm.bHapus.setEnabled(false);			
			break;
			
	}
};
