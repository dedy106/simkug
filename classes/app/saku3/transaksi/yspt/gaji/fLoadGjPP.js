window.app_saku3_transaksi_yspt_gaji_fLoadGjPP = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_gaji_fLoadGjPP.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_yspt_gaji_fLoadGjPP";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Upload Gaji PP", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		

		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						

		// this.cb_ta = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Periode Akademik",multiSelection:false,tag:2,change:[this,"doChange"]});			
		// this.c_modul = new saiCB(this,{bound:[20,13,180,20],caption:"Jenis Input",items:["TAMBAH","UBAH"],readOnly:true,tag:2}); 
		this.bValid = new button(this,{bound:[790,18,80,20],caption:"Validasi",click:[this,"doValid"]});			

		this.pc2 = new pageControl(this,{bound:[10,10,1000,390], childPage:["Data Gaji","Controlling","Error Msg"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9,
				colTitle:["PP","Nama PP","GADAS","TUDAS","TUPOS","TUHAL","LMBR"],
				colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,100,200,80]],
				colFormat:[[2,3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		

		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
					colTitle:["Kode Akun","Kode PP","Kode DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,100,100]],
					readOnly:true,colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		

		this.sgE = new portalui_saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgnE = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sgE});		

		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		
		this.rearrangeChild(10,23);		
		this.setTabChildIndex();				
		
		// this.cb_ta.setSQL("select distinct kode_ta, nama from dikti_ta where kode_lokasi='"+this.app._lokasi+"'",["kode_ta","nama"],false,["Kode","Deskripsi"],"and","Periode Akademik",true);			
		// var data = this.dbLib.getDataProvider("select top 1 kode_ta from dikti_ta where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
		// if (typeof data == "object"){			
		// 	var line = data.rs.rows[0];							
		// 	if (line != undefined){
		// 		this.cb_ta.setText(line.kode_ta);
		// 	}
		// }

		setTipeButton(tbAllFalse);		
	}
};
window.app_saku3_transaksi_yspt_gaji_fLoadGjPP.extend(window.portalui_childForm);
window.app_saku3_transaksi_yspt_gaji_fLoadGjPP.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();				
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doValid: function() {
		try {
			this.inValid = false;			
			
			var strSQL = "select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' ";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataPP = dataS;
			}		
				
			for (var i=0; i < this.sg1.getRowCount();i++){
				this.sg1.cells(0,i,"INVALID-"+this.sg1.cells(0,i));					
				if (this.dataPP.rs.rows.length > 0) {
					for (var j=0;j < this.dataPP.rs.rows.length;j++){				
						if (this.sg1.cells(0,i).substr(8,30) == this.dataPP.rs.rows[j].kode_pp) {
							this.sg1.cells(0,i,this.sg1.cells(0,i).substr(8,30));	
							this.sg1.cells(1,i,this.dataPP.rs.rows[j].nama);	
						}															
					}	
					if (this.sg1.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;									
				}											
			}	
		

			if (this.inValid == false) {
				setTipeButton(tbSimpan);	
				this.doHitungGar();
			}
			else {
				this.pc2.setActivePage(this.pc2.childPage[2]);	
				this.sgE.clear();
				for (var i=0; i < this.sg1.getRowCount();i++) {
					if (this.sg1.cells(0,i).substr(0,7) == "INVALID") {
						var j = i+1;
						this.sgE.appendData([j]);						
					}
				}
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doHitungGar: function(){
		try {			
			var gadas = tudas = tupos = tuhal = lembur = 0;
			for (var i=0;i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i)){				
					gadas += nilaiToFloat(this.sg1.cells(2,i));
					tudas += nilaiToFloat(this.sg1.cells(3,i));
					tupos += nilaiToFloat(this.sg1.cells(4,i));
					tuhal += nilaiToFloat(this.sg1.cells(5,i));
					lembur += nilaiToFloat(this.sg1.cells(6,i));					
				}
			}
			
			var str = "select kode_akun from gj_param where kode_lokasi ='"+this.app._lokasi+"' order by kode_akun";
			var data = this.dbLib.getDataProvider(str,true);							
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg2.appendData([line.kode_akun,"PP","DRK","0","0","0"]);
				}
			} else this.sg2.clear(1);	

			// var sls = 0;
			// for (var i=0;i < this.sg2.getRowCount();i++){				
			// 	var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);			
			// 	if (typeof data == "object" && data.rs.rows[0] != undefined){
			// 		var line = data.rs.rows[0];
			// 		data = line.gar.split(";");					
			// 		sls = parseFloat(data[0]) - parseFloat(data[1]);
			// 		this.sg2.cells(3,i,floatToNilai(sls));
			// 		sls = sls - nilaiToFloat(this.sg2.cells(4,i));
			// 		this.sg2.cells(5,i,floatToNilai(sls));
			// 	}
			// }
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
									sql.add("insert into dikti_camaba(no_reg,kode_ta,nama,kode_lokasi) values "+
						    				"('"+this.sg1.cells(0,i)+"','"+this.cb_ta.getText()+"','"+this.sg1.cells(1,i)+"','"+this.app._lokasi+"')");

								}
							}
							
							if (this.c_modul.getText() == "UBAH") {		
								for (var i=0;i < this.sg1.getRowCount();i++){									
									sql.add("update dikti_camaba set nama='"+this.sg1.cells(1,i)+"',kode_ta='"+this.cb_ta.getText()+"' "+
											"where no_reg = '"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
