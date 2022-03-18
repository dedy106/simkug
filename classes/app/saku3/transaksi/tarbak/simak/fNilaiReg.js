window.app_saku3_transaksi_tarbak_simak_fNilaiReg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fNilaiReg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simak_fNilaiReg";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Hasil Penilaian Calon Siswa Baru", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	
	
		this.pc1 = new pageControl(this,{bound:[20,14,1000,450], childPage:["Data Penilaian","Daftar Penilaian"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
					colTitle:["No. Bukti","Tahun Ajaran","Sekolah"],
					colWidth:[[2,1,0],[150,150,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});		

		this.cb_ta = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"Tahun Ajaran",multiSelection:false,readOnly:true,tag:2,change:[this,"doChange"]});			
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Sekolah", readOnly:true, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.bRekon = new button(this.pc1.childPage[0],{bound:[860,13,100,20],caption:"Validasi", click:[this,"doRekon"]});

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,12,995,347], childPage:["Data Nilai","Error Msg"]});							
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["ID Registrasi","Nama","Nilai","Sts Kelulusan","Val-IDReg","Val-Status"],					
					colWidth:[[5,4,3,2,1,0],[80,80,150,80,350,150]],		
					colFormat:[[2],[cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 		
					readOnly:true,
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager2"]});		

		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg3, pager:[this,"doPage3"]});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doClick();					
	
			this.cb_ta.setSQL("select kode_ta,nama from sis_ta where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_ta","nama"],false,["Kode","Nama"],"and","Data TA",true);

			var strSQL = "select kode_ta from sis_ta where flag_aktif='1' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.cb_ta.setText(line3.kode_ta);	
				}
			}

			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simak_fNilaiReg.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simak_fNilaiReg.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn2.setTotalPage(sender.getTotalPage());
			this.sgn2.rearrange();						
		} catch(e) {alert(e);}
	},
	doPager2: function(sender,page){
		this.sg2.doSelectPage(page);
	},

	doRekon: function(sender){				
		try {
			var strSQL = "select no_reg,nama from sis_siswareg where kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataNo = dataS;
			}				
			this.inValid = false;
			for (var i=0; i < this.sg2.getRowCount();i++){
				this.sg2.cells(4,i,"INVALID");
				this.sg2.cells(5,i,"INVALID");
				for (var j=0;j < this.dataNo.rs.rows.length;j++){
					if (this.sg2.cells(0,i) == this.dataNo.rs.rows[j].no_reg) {
						this.sg2.cells(1,i,this.dataNo.rs.rows[j].nama);			
						this.sg2.cells(4,i,"VALID");				
					}
				}					
				if (this.sg2.cells(4,i) == "INVALID") this.inValid = true;									

				if (this.sg2.cells(3,i).toUpperCase() == "LULUS" || this.sg2.cells(3,i).toUpperCase() == "TIDAK") {
					this.sg2.cells(5,i,"VALID");				
				} 

				if (this.sg2.cells(5,i) == "INVALID") this.inValid = true;
			}

			if (this.inValid == false) setTipeButton(tbSimpan);	
			else {
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg3.clear();
				setTipeButton(tbAllFalse);	
				for (var i=0; i < this.sg2.getRowCount();i++) {
					if (this.sg2.cells(4,i) == "INVALID" || this.sg2.cells(5,i) == "INVALID") {
						var j = i+1;	
						this.sg3.appendData([j]);
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
	simpan: function(){			
		try{
			if (this.stsSimpan == 1) this.doClick();	
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					//raplace data sebelumnya
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && this.sg2.cells(4,i) == "VALID" && this.sg2.cells(5,i) == "VALID"){								
								sql.add("delete from sis_nilai_reg where no_reg='"+this.sg2.cells(0,i)+"' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'");
								sql.add("insert into sis_nilai_reg(no_bukti,kode_ta,kode_pp,kode_lokasi,no_reg,nilai,keterangan,tgl_input) values "+
								 		"('"+this.e_nb.getText()+"','"+this.cb_ta.getText()+"','"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"',getdate() )");
							}
						}
					}	

					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
						sql.add("delete from sis_nilai_reg where no_bukti = '"+this.e_nb.getText()+"' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbAllFalse);				
				this.sg1.clear();this.sg2.clear();this.sg3.clear();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.doClick();
				break;
			case "simpan" :
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;							
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doClick:function(sender){
			if (this.stsSimpan == 0) {
				this.sg1.clear();this.sg2.clear();this.sg3.clear();
			}
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sis_nilai_reg","no_bukti",this.app._lokasi+"-BNREG.","0000"));
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));

				var strSQL = "select a.no_reg,b.nama,a.nilai,a.keterangan from sis_nilai_reg a inner join sis_siswareg b on a.no_reg=b.no_reg where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp = '"+this.app._kodePP+"' ";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg2.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg2.appendData([line1.no_reg,line1.nama,line1.nilai,line1.keterangan,"VALID","VALID"]);
					}
				} else this.sg2.clear(1);
			}	
		} catch(e) {alert(e);}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan  (No Bukti : "+ this.e_nb.getText()+")","");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg1.clear();this.sg2.clear();this.sg3.clear();
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},	
	doLoad:function(sender){								
		var strSQL = "select no_bukti,kode_ta,kode_pp from sis_nilai_reg where kode_lokasi='"+this.app._lokasi+"'  group by no_bukti,kode_pp,kode_ta ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_bukti,line.kode_ta,line.kode_pp]); 
		}
		this.sg1.setNoUrut(start);		
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
