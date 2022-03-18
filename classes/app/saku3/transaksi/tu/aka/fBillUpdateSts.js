window.app_saku3_transaksi_tu_aka_fBillUpdateSts = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_aka_fBillUpdateSts.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_tu_aka_fBillUpdateSts";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Update Status Mahasiswa", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		

		this.e_periode = new portalui_saiLabelEdit(this,{bound:[520,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.c_tahunaka = new saiCB(this,{bound:[20,13,200,20],caption:"Tahun Akademik",readOnly:true,tag:2}); 
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				

		this.pc2 = new pageControl(this,{bound:[10,10,1000,350], childPage:["Upload Data","Error Msg"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:2,tag:9,
				colTitle:["NIM","Status"],
				colWidth:[[1,0],[150,150]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		

		this.sg2 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:1,tag:9,
				colTitle:["Baris Invalid"],
				colWidth:[[0],[150]],				
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		
		this.rearrangeChild(10,23);
		this.setTabChildIndex();		
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

		this.c_tahunaka.items.clear();
		var data = this.dbLib.getDataProvider("select distinct tahunaka as tahunaka from aka_tahunaka where kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				line = data.rs.rows[i];													
				this.c_tahunaka.addItem(i,line.tahunaka);
			}
		}

		var data = this.dbLib.getDataProvider("select tahunaka from aka_tahunaka where periode= substring(convert(varchar,getdate(),112),1,6) and  kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){											
				this.c_tahunaka.setText(line.tahunaka);				
			}
		}
		
		setTipeButton(tbSimpan);				
	}
};
window.app_saku3_transaksi_tu_aka_fBillUpdateSts.extend(window.portalui_childForm);
window.app_saku3_transaksi_tu_aka_fBillUpdateSts.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			var stsValid = true;
			for (var i=0;i < this.sg1.getRowCount();i++){									
				this.sg1.cells(1,i,this.sg1.cells(1,i).toUpperCase());				
				if (this.sg1.cells(1,i) != "AKTIF" && this.sg1.cells(1,i) != "NON-AKTIF") {
					stsValid = false;
					this.sg1.cells(1,i,"INVALID-"+this.sg1.cells(1,i));
				}
			}
			if (!stsValid) {
				setTipeButton(tbAllFalse);
				this.sg2.clear();
				for (var i=0;i < this.sg1.getRowCount();i++){									
					if (this.sg1.cells(1,i).substr(0,7) == "INVALID") {
						var j = i+1;
						this.sg2.appendData([j]);
					}
				}
			}
			else setTipeButton(tbSimpan);

			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
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
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :					
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	

							var id  = this.standarLib.noBuktiOtomatis(this.dbLib,"aka_mhsstatus_m","no_bukti",this.app._lokasi+"-MST"+this.e_periode.getText().substr(2,4)+".","0000");							
							
							sql.add("insert into aka_mhsstatus_m (no_bukti,kode_lokasi,tanggal,periode,tahunaka,keterangan,tgl_input,nik_user,jenis) values "+
									"('"+id+"','"+this.app._lokasi+"', '"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.c_tahunaka.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"','AKTIF-MHS')");

							for (var i=0;i < this.sg1.getRowCount();i++){																	
								sql.add("update aka_load_d set flag_status = '"+this.sg1.cells(1,i)+"' where flag_status='-' and nim = '"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"' and tahunaka='"+this.c_tahunaka.getText()+"'");
								sql.add("insert into aka_mhsstatus_d (no_bukti,kode_lokasi, nim, tahunaka, flag_status, sts_tagih) values "+
										"('"+id+"','"+this.app._lokasi+"', '"+this.sg1.cells(0,i)+"', '"+this.c_tahunaka.getText()+"', '"+this.sg1.cells(1,i)+"', '-')");
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
	},	
	doChange: function(sender) {
		try {
			var data = this.dbLib.getDataProvider("select tahunaka from aka_tahunaka where periode= '"+this.e_periode.getText()+"' and  kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){											
					this.c_tahunaka.setText(line.tahunaka);				
				}
			}
		}
		catch(e) {
			alert(e);
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
