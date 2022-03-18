window.app_saku3_transaksi_tu_kegiatan_fRRKeg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kegiatan_fRRKeg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kegiatan_fRRKeg";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Redistribusi Budget Kegiatan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");

		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		

		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Budget Redistibusi"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Redist", maxLength:20, tag:1,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});													
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Deskripsi", maxLength:100, tag:1});						

		this.cb_donor = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"ID Donor",tag:1,multiSelection:false,change:[this,"doChange"]});				
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[770,11,200,20],caption:"Saldo Donor", tag:1,  readOnly:true, tipeText:ttNilai, text:"0"});								
		this.cb_terima = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"ID Penerima",tag:1,multiSelection:false,change:[this,"doChange"]});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[770,17,200,20],caption:"Tot. Distribusi", tag:1,  readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,22,990,303], childPage:["Distribusi Kegiatan","Kegiatan Donor","Kegiatan Penerima"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:2,tag:9,
		            colTitle:["Rincian Kegiatan","Nilai Distribusi"],
					colWidth:[[1,0],[200,500]],														
					colFormat:[[1],[cfNilai]],		
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],	
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],									
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sgd = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:2,tag:9,
			colTitle:["Rincian Kegiatan","Nilai"],
			colWidth:[[1,0],[200,500]],														
			colFormat:[[1],[cfNilai]],	
			readOnly:true,				
			autoAppend:false,defaultRow:1});
		this.sgnd = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sgd});		

		this.sgt = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:2,tag:9,
			colTitle:["Rincian Kegiatan","Nilai"],
			colWidth:[[1,0],[200,500]],														
			colFormat:[[1],[cfNilai]],	
			readOnly:true,				
			autoAppend:false,defaultRow:1});
		this.sgnt = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sgt});		


		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();

		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_donor.setSQL("select no_aju,keterangan from keg_aju_m where progress = '1' and kode_lokasi='"+this.app._lokasi+"'",["no_aju","keterangan"],false,["ID Kegiatan","Keterangan"],"and","Data Kegiatan",true);
			this.cb_terima.setSQL("select no_aju,keterangan from keg_aju_m where progress = '1' and kode_lokasi='"+this.app._lokasi+"'",["no_aju","keterangan"],false,["ID Kegiatan","Keterangan"],"and","Data Kegiatan",true);
			
		
		}catch(e){
			systemAPI.alert(e);
		}
		
	}
};
window.app_saku3_transaksi_tu_kegiatan_fRRKeg.extend(window.childForm);
window.app_saku3_transaksi_tu_kegiatan_fRRKeg.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			this.doNilaiChange();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(1,i) != ""){
					tot += nilaiToFloat(this.sg.cells(1,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 1 && this.sg.cells(1,row) != "") this.sg.validasi();
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
					
					sql.add("insert into keg_rra_m(no_rra,kode_lokasi,periode,nik_user,tgl_input,tanggal,keterangan,kode_donor,kode_terima,nilai) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_donor.getText()+"','"+this.cb_terima.getText()+"',"+nilaiToFloat(this.e_total.getText())+")");															

					sql.add("update keg_aju_m set nilai = nilai - "+nilaiToFloat(this.e_total.getText())+"  where no_aju = '"+this.cb_donor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update keg_aju_m set nilai = nilai + "+nilaiToFloat(this.e_total.getText())+"  where no_aju = '"+this.cb_terima.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var k = i+1000;
								sql.add("insert into keg_aju_d (no_urut,no_aju,kode_lokasi,kegiatan,nilai, no_ref)  values "+
										"("+k+",'"+this.cb_donor.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',-"+nilaiToFloat(this.sg.cells(1,i))+",'"+this.e_nb.getText()+"')");
								sql.add("insert into keg_aju_d (no_urut,no_aju,kode_lokasi,kegiatan,nilai, no_ref)  values "+
										"("+k+",'"+this.cb_terima.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(1,i))+",'"+this.e_nb.getText()+"')");
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbAllFalse);
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.pc2.setActivePage(this.pc2.childPage[0]);														
				this.doClick();		
				this.sg.clear(1);									
				break;
				
			case "simpan" :				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai total tidak boleh nol atau kurang.");
					return false;						
				}	
				if (nilaiToFloat(this.e_saldo.getText()) < nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Transaksi tidak valid.","Saldo Donor kurang dari Nilai Redistribusi.");
					return false;						
				}			
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;						
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},		
	doChange: function(sender){	
		if (sender == this.cb_donor && this.cb_donor.getText()!= ""){			
			var data = this.dbLib.getDataProvider(
				      "select a.nilai-isnull(b.pakai,0) as saldo "+
					  "from keg_aju_m a "+
						"left join (   "+
						"    select no_ajukeg,kode_lokasi,  sum(nilai)  as pakai "+
						"    from it_aju_m where kode_lokasi='"+this.app._lokasi+"' and no_aju <>'"+this.e_nb.getText()+"' and progress+modul <> '4PANJAR' "+
						"    group by no_ajukeg,kode_lokasi "+
						" ) b on a.no_aju = b.no_ajukeg and a.kode_lokasi=b.kode_lokasi "+
					  "where a.no_aju ='"+this.cb_donor.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];																
				this.e_saldo.setText(floatToNilai(line.saldo));
			}

			var strSQL = "select * from keg_aju_d where no_aju = '"+this.cb_donor.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut";		 							
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgd.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sgd.appendData([line.kegiatan,floatToNilai(line.nilai)]);
				}						
			} else this.sgd.clear(1);
		}
		if (sender == this.cb_terima && this.cb_terima.getText()!= ""){			
			var strSQL = "select * from keg_aju_d where no_aju = '"+this.cb_terima.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut";		 							
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgt.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sgt.appendData([line.kegiatan,floatToNilai(line.nilai)]);
				}						
			} else this.sgt.clear(1);
		}
	},
	doClick: function(sender){	
		if (this.stsSimpan == 0) {
			this.sg.clear(1);																
		}	
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'keg_rra_m','no_rra',this.app._lokasi+"-RKG"+this.e_periode.getText().substr(2,4)+".",'0000'));
		this.e_ket.setFocus();
		this.stsSimpan = 1;	
		setTipeButton(tbSimpan);
			
	},						
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});
