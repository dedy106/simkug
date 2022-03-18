window.app_saku2_transaksi_kopeg_sju_fKlaimE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fKlaimE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fKlaimE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Klaim: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Klaim", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 						
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.e_nb = new saiCBBL(this,{bound:[20,13,260,20],caption:"No Klaim", multiSelection:false, maxLength:10, tag:0, readOnly:true,change:[this,"doChange"]});						
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,450], childPage:["Detail Klaim"]});		
		this.e_berkas = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"No Berkas", maxLength:200});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Date Of Loss", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,100,18]}); 				
		this.l_tgl3 = new portalui_label(this.pc1.childPage[0],{bound:[270,11,100,18],caption:"Tgl Diketahui", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[370,11,100,18]}); 								
		this.e_tipe = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,11,450,20],caption:"COB", readOnly:true});		
		this.e_nopolis = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,450,20],caption:"No Polis", readOnly:true});
		this.e_tglpolis = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,19,450,20],caption:"Tgl Polis", readOnly:true});		
		this.e_unit = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,450,20],caption:"Unit", readOnly:true});
		this.e_curr = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,20,450,20],caption:"Curr", readOnly:true});				
		this.e_penanggung = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,450,20],caption:"Penanggung", readOnly:true});
		this.e_tertanggung = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,21,450,20],caption:"Tertanggung", readOnly:true});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_estimasi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Nilai Estimasi", tag:1,tipeText:ttNilai, text:"0"});				
		this.e_premi = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,18,200,20],caption:"Premi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Lokasi", maxLength:200});
		this.cb_sebab = new saiCBBL(this.pc1.childPage[0],{bound:[520,13,200,20],caption:"Penyebab Kerugian", multiSelection:false, maxLength:10, tag:2});
		this.e_memo = new saiMemo(this.pc1.childPage[0],{bound:[20,20,450,80],caption:"Uraian Klaim",tag:9});
		
		this.sgUpld = new saiGrid(this.pc1.childPage[0],{bound:[1,21,468,140],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					  colWidth:[[1,0],[80,350]], readOnly:true, change:[this,"doGridChange"], rowCount:1,tag:9});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/", "object","server/media/");	
		this.sgnUpld = new sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height - 25,470,25],buttonStyle:1, grid:this.sgUpld});
		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select now() as tgl ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.dp_d1.setText(line.tgl);
			}
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fKlaimE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fKlaimE.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																				
					sql.add("delete from sju_klaim where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_klaim_dok where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					sql.add("insert into sju_klaim (no_klaim,periode,kode_lokasi,tanggal,no_polis,keterangan,nik_user,tgl_input,nilai,progress,no_berkas,tgl_dol,lokasi,sebab,tgl_tahu) values "+
							"('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_nopolis.getText()+"','"+this.e_memo.getText()+"','"+this.app._userLog+"',getdate(),"+nilaiToFloat(this.e_estimasi.getText())+",'KLAIM','"+this.e_berkas.getText()+"','"+this.dp_d2.getDateString()+"','"+this.e_lokasi.getText()+"','"+this.cb_sebab.getText()+"','"+this.dp_d3.getDateString()+"')");					
					
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into sju_klaim_dok (no_klaim,no_file,nu,kode_lokasi) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(1,i).filedest+"','"+ix+"','"+this.app._lokasi+"')");
						}	
					}					
					
					for (var i in this.listFiles.objList) {
						var ketemu = false;
						for (var j=0;j < this.sgUpld.getRowCount();j++){
							ketemu = i == this.sgUpld.cells(0,j);
							if (ketemu) break;
						}
						if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
					}					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
					this.doMail(this.e_nb.getText());
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sgUpld.clear(1);										
					this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :									
				var strSQL = "select a.no_polis from sju_polis_m a "+
							 "where a.no_polis='"+this.e_nopolis.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and '"+this.dp_d1.getDateString()+"' between a.tgl_mulai and a.tgl_selesai ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line == undefined){							
						system.alert(this,"Transaksi tidak valid.","Tgl Klaim diluar periode Polis.");
						return false;						
					}
				}				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
					this.preView = "0";
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sju_klaim where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_klaim_dok where no_klaim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.deletedFiles = "";	
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							if (this.deletedFiles != "") this.deletedFiles += ";";
							this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(0,i);
						}
					}
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				break								
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}				
	},			


	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {			
			this.e_nb.setSQL("select no_klaim, no_polis from sju_klaim where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and progress ='KLAIM'",["no_klaim","no_polis"],false,["No Klaim","No Polis"],"and","Daftar Klaim",true);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!= "") {											
			var strSQL = "select a.no_polis,convert(varchar,a.tanggal,103) as tgl, b.kode_pp+' - '+g.nama as pp, c.kode_cust +'-'+c.nama as cust, d.kode_vendor +'-'+d.nama as vendor,e.kode_tipe+'-'+e.nama as tipe,b.kode_curr,b.total,b.n_premi,f.keterangan,f.no_berkas,f.lokasi,f.sebab,f.tgl_dol,f.nilai as estimasi,f.tgl_tahu "+ 
		             "from sju_polis_m a inner join sju_quo_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
					 "                   inner join sju_cust c on b.kode_cust = c.kode_cust and b.kode_lokasi=c.kode_lokasi "+
					 "                   inner join sju_vendor d on b.kode_vendor = d.kode_vendor and b.kode_lokasi=d.kode_lokasi "+
					 "                   inner join sju_tipe e on b.kode_tipe = e.kode_tipe and b.kode_lokasi=e.kode_lokasi "+
					 "                   inner join pp g on b.kode_pp = g.kode_pp and b.kode_lokasi=g.kode_lokasi "+
					 "                   inner join sju_klaim f on a.no_polis=f.no_polis and a.kode_lokasi=f.kode_lokasi "+
		             "where f.no_klaim='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_nopolis.setText(line.no_polis);
					this.e_tipe.setText(line.tipe);
					this.e_tglpolis.setText(line.tgl);
					this.e_unit.setText(line.pp);
					this.e_curr.setText(line.kode_curr);
					this.e_penanggung.setText(line.vendor);
					this.e_tertanggung.setText(line.cust);
					this.e_nilai.setText(floatToNilai(line.total));
					this.e_premi.setText(floatToNilai(line.n_premi));				
					this.e_memo.setText(line.keterangan);													
					this.e_lokasi.setText(line.lokasi);					
					this.e_berkas.setText(line.no_berkas);
					this.e_estimasi.setText(floatToNilai(line.estimasi));
					var sebab = line.sebab;
					
					var strSQL = "select d.kode_sebab,d.nama from sju_quo_m b "+
				             "inner join sju_tipe a on a.kode_tipe=b.kode_tipe and a.kode_lokasi=b.kode_lokasi "+
							 "inner join sju_sebab d on a.kode_tipe=d.kode_tipe and a.kode_lokasi=d.kode_lokasi "+
				             "where b.no_polis ='"+this.e_nopolis.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";					   								
					this.cb_sebab.setSQL(strSQL,["d.kode_sebab","d.nama"],false,["Kode","Nama"],"and","Data Penyebab Klaim",true);
					
					this.cb_sebab.setText(sebab);
				}
			}
			
			this.sgUpld.clear();
			this.deleteFiles = [];
			this.listFiles = new arrayMap();			
			var data = this.dbLib.getDataProvider("select a.no_file from sju_klaim_dok a "+
					   "where a.no_klaim = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgUpld.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.listFiles.set(line.no_gambar,line.no_gambar); 
					this.sgUpld.appendData([line.no_file, {filedest:line.no_file, tmpfile:line.no_file}]);
				}
			} else this.sgUpld.clear(1);								
		}		
				
	},	
	doMail: function(no_ver){
		try{
			this.nama_report="server_report_eclaim3_rptVerifikasiMail";
			this.filter = " where h.no_ver='"+no_ver+"' ";
			this.filter2 = this.app._email+"/"+this.app._emailadm+"/"+this.app._emailttg+"/"+this.app._userStatus+"/"+this.app._fromadm;
			this.viewer.prepare();
			this.viewer.setVisible(true);
			this.app._mainForm.pButton.setVisible(false);
			this.app._mainForm.reportNavigator.setVisible(true);
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			this.showFilter = "";
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
			this.page = 1;
			this.allBtn = false;
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
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
	doGridChange: function(sender, col, row,param1,result, data){
	    try{        	
			if (sender == this.sgUpld && col == 1){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + data.tmpfile;
                this.sgUpld.cells(0,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});