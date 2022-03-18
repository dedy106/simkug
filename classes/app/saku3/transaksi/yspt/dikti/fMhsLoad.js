window.app_saku3_transaksi_yspt_dikti_fMhsLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_dikti_fMhsLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_yspt_dikti_fMhsLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Mahasiswa [Load]", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.cb_ta = new saiCBBL(this,{bound:[20,11,200,20],caption:"Periode Akademik", readOnly:true, tag:2,change:[this,"doChange"]});				
		this.c_modul = new saiCB(this,{bound:[20,13,180,20],caption:"Jenis Input",items:["TAMBAH","UBAH"],readOnly:true,tag:2}); 
		this.bValid = new button(this,{bound:[220,13,80,20],caption:"Validasi",click:[this,"doValid"]});			
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,410], childPage:["Data Siswa","Error Msg"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
				colTitle:["NIM","Nama","Angkatan","Jurusan","Kelas","Status"],
				colWidth:[[5,4,3,2,1,0],[100,100,100,100,250,120]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		

		this.sg2 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		


		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		
		this.rearrangeChild(10,23);		
		this.setTabChildIndex();				
		
		this.cb_ta.setSQL("select distinct kode_ta, nama from dikti_ta where kode_lokasi='"+this.app._lokasi+"'",["kode_ta","nama"],false,["Kode","Deskripsi"],"and","Periode Akademik",true);			

		var data = this.dbLib.getDataProvider("select top 1 kode_ta from dikti_ta where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
		if (typeof data == "object"){			
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.cb_ta.setText(line.kode_ta);
			}
		}

		setTipeButton(tbAllFalse);		

	}
};
window.app_saku3_transaksi_yspt_dikti_fMhsLoad.extend(window.portalui_childForm);
window.app_saku3_transaksi_yspt_dikti_fMhsLoad.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			setTipeButton(tbAllFalse);	
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();	
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
	},	

	doValid: function() {
		try {
			//nim
			var strSQL = "select nim from dikti_mhs where kode_lokasi='"+this.app._lokasi+"' union select '-'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataNIM = data;
			}	
			//angkatan
			var strSQL = "select kode_akt from dikti_angkat where kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataAKT = data;
			}	
			//jurusan
			var strSQL = "select kode_jur from dikti_jur where kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJUR = data;
			}
			//kelas
			var strSQL = "select kode_kelas from dikti_kelas where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataKLS = data;
			}
			//status mhs
			if (this.c_modul.getText() == "TAMBAH") var strSQL = "select kode_status from dikti_mhs_status where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'";			
			else var strSQL = "select kode_status from dikti_mhs_status where kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataSTS = data;
			}
					
			this.inValid = false;		
			for (var i=0; i < this.sg1.getRowCount();i++){
				if (this.c_modul.getText() == "UBAH") this.sg1.cells(0,i,"INVALID | "+this.sg1.cells(0,i));		
				this.sg1.cells(2,i,"INVALID | "+this.sg1.cells(2,i));					
				this.sg1.cells(3,i,"INVALID | "+this.sg1.cells(3,i));					
				this.sg1.cells(4,i,"INVALID | "+this.sg1.cells(4,i));					
				this.sg1.cells(5,i,"INVALID | "+this.sg1.cells(5,i));					

				if (this.dataNIM.rs.rows.length > 0) {
					for (var j=0;j < this.dataNIM.rs.rows.length;j++){	
						if (this.c_modul.getText() == "UBAH") {
							if (this.sg1.cells(0,i).substr(10,20) == this.dataNIM.rs.rows[j].nim) {
								this.sg1.cells(0,i,this.dataNIM.rs.rows[j].nim);								
							}
						}	
						if (this.c_modul.getText() == "TAMBAH") {
							if (this.sg1.cells(0,i) == this.dataNIM.rs.rows[j].nim) {
								this.sg1.cells(0,i,"INVALID | "+this.sg1.cells(0,i));				
								this.inValid = true;										
							}	
						}						
					}	
					if (this.sg1.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;
				}		
				
				for (var j=0;j < this.dataAKT.rs.rows.length;j++){
					if (this.sg1.cells(2,i).substr(10,10) == this.dataAKT.rs.rows[j].kode_akt) {	
						this.sg1.cells(2,i,this.dataAKT.rs.rows[j].kode_akt);					
					}
				}	
				if (this.sg1.cells(2,i).substr(0,7) == "INVALID") this.inValid = true;
				
				for (var j=0;j < this.dataJUR.rs.rows.length;j++){
					if (this.sg1.cells(3,i).substr(10,10) == this.dataJUR.rs.rows[j].kode_jur) {	
						this.sg1.cells(3,i,this.dataJUR.rs.rows[j].kode_jur);					
					}
				}	
				if (this.sg1.cells(3,i).substr(0,7) == "INVALID") this.inValid = true;	
				
				for (var j=0;j < this.dataKLS.rs.rows.length;j++){
					if (this.sg1.cells(4,i).substr(10,10) == this.dataKLS.rs.rows[j].kode_kelas) {	
						this.sg1.cells(4,i,this.dataKLS.rs.rows[j].kode_kelas);					
					}
				}	
				if (this.sg1.cells(4,i).substr(0,7) == "INVALID") this.inValid = true;							

				for (var j=0;j < this.dataSTS.rs.rows.length;j++){
					if (this.sg1.cells(5,i).substr(10,10) == this.dataSTS.rs.rows[j].kode_status) {	
						this.sg1.cells(5,i,this.dataSTS.rs.rows[j].kode_status);					
					}
				}	
				if (this.sg1.cells(5,i).substr(0,7) == "INVALID") this.inValid = true;							

			}	

			if (!this.inValid) setTipeButton(tbSimpan);	
			else {
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg2.clear();
				for (var i=0; i < this.sg1.getRowCount();i++) {
					if (this.sg1.cells(0,i).substr(0,7) == "INVALID" || this.sg1.cells(2,i).substr(0,7) == "INVALID" || 
						this.sg1.cells(3,i).substr(0,7) == "INVALID" || this.sg1.cells(4,i).substr(0,7) == "INVALID" || 
						this.sg1.cells(5,i).substr(0,7) == "INVALID") {

						var j = i+1;
						this.sg2.appendData([j]);						
					}
				}
			}
		}
		catch(e) {
			alert(e);
		}
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");		
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");		
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");		
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 					
					this.sg1.setTag("9");				
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :					
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							if (this.c_modul.getText() == "TAMBAH") {	
								for (var i=0;i < this.sg1.getRowCount();i++){																										
									sql.add("insert into dikti_mhs(nim,kode_lokasi,nama,kode_status,kode_akt,kode_jur,kode_kelas) values "+
											"('"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"')");
																			
									sql.add("insert into dikti_mhs_tarif(nim,kode_lokasi,kode_ta,kode_param,tarif) "+
											"select a.nim,a.kode_lokasi,'"+this.cb_ta.getText()+"',b.kode_param,b.tarif "+
											"from dikti_mhs a "+
											"	  inner join dikti_param_tarif b on a.kode_akt=b.kode_akt and a.kode_lokasi=b.kode_lokasi and b.kode_akt=b.kode_akt and a.kode_jur=b.kode_jur and a.kode_kelas=b.kode_kelas and b.kode_ta='"+this.cb_ta.getText()+"' "+
											"	  inner join dikti_mhs_status c on a.kode_status=c.kode_status and a.kode_lokasi=c.kode_lokasi  "+
											"where a.nim='"+this.sg1.cells(0,i)+"' and c.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'");						
								
								}
							}
							
							if (this.c_modul.getText() == "UBAH") {		
								for (var i=0;i < this.sg1.getRowCount();i++){																												
									sql.add("update dikti_mhs set kode_akt='"+this.sg1.cells(2,i)+"',kode_jur='"+this.sg1.cells(3,i)+"',kode_kelas='"+this.sg1.cells(4,i)+"',kode_status='"+this.sg1.cells(5,i)+"' "+
											"where nim = '"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");

									sql.add("delete from dikti_mhs_tarif where nim='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
									sql.add("insert into dikti_mhs_tarif(nim,kode_lokasi,kode_ta,kode_param,tarif) "+
											"select a.nim,a.kode_lokasi,'"+this.cb_ta.getText()+"',b.kode_param,b.tarif "+
											"from dikti_mhs a "+
											"	  inner join dikti_param_tarif b on a.kode_akt=b.kode_akt and a.kode_lokasi=b.kode_lokasi and b.kode_akt=b.kode_akt and a.kode_jur=b.kode_jur and a.kode_kelas=b.kode_kelas and b.kode_ta='"+this.cb_ta.getText()+"' "+
											"	  inner join dikti_mhs_status c on a.kode_status=c.kode_status and a.kode_lokasi=c.kode_lokasi  "+
											"where a.nim='"+this.sg1.cells(0,i)+"' and c.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'");						
								}
							}
						
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
				
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses dieksekusi.");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
