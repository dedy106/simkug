window.app_eclaim3_transaksi_fDokLoadE = function(owner)
{
	if (owner)
	{
		window.app_eclaim3_transaksi_fDokLoadE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim3_transaksi_fDokLoadE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kelengkapan Dokumen: Edit", 0);	
				
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Dokumen", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,18,980,470], childPage:["Detail Klaim","Histori"]});
		this.e_noklaim = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"No Klaim", readOnly:true});
		this.e_tglklaim = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,14,450,20],caption:"Tanggal Klaim", readOnly:true});				
		this.e_nopolis = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"No Polis", readOnly:true});		
		this.e_nodok = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,15,450,20],caption:"Dok. Klaim", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Nilai Estimasi", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_tgldok = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,16,450,20],caption:"Tanggal Dok", readOnly:true});		
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Lok. Kejadian", readOnly:true});
		this.e_loker = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,17,450,20],caption:"Loker", readOnly:true});		
		this.e_sebab = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"Penyebab", readOnly:true});
		this.e_objek = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,18,450,20],caption:"Objek", readOnly:true});		
		this.e_pic = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,450,20],caption:"Contact Person", readOnly:true});
		this.e_tel = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,19,450,20],caption:"No Telpon", readOnly:true});		
		this.e_memo = new saiMemo(this.pc1.childPage[0],{bound:[20,20,450,80],caption:"Keterangan",tag:9});
		
		this.l_label = new portalui_label(this.pc1.childPage[0],{bound:[20,21,100,18],caption:"Data Dokumen", underline:true});
		this.sgUpld = new saiGrid(this.pc1.childPage[0],{bound:[121,21,848,200],colCount:5,
				      colTitle:["Kode Jenis","Nama Jenis","Keterangan","Dokumen","Upload"],
					  columnReadOnly:[true,[0,1,3,4],[2]],
					  colFormat:[[4],[cfUpload]],
					  colWidth:[[4,3,2,1,0],[80,250,250,150,80]], buttonStyle:[[0],[bsEllips]], 
					  ellipsClick:[this,"doEllipsClick"],change:[this,"doGridChange"], rowCount:1});
		this.sgUpld.setUploadParam([4],"uploadTo", "server/media/", "object","server/media/");	
		this.sgnUpld = new sgNavigator(this.pc1.childPage[0],{bound:[121,this.pc1.height - 25,850,25],buttonStyle:1, grid:this.sgUpld});
		
		this.sgUpld2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:6,tag:9,
				      colTitle:["Kode Jenis","Nama Jenis","No Dokumen","Tanggal","Keterangan","Dokumen"],
					  readOnly:true, colWidth:[[5,4,3,2,1,0],[220,250,80,150,150,80]],
					  autoAppend:false,defaultRow:1});		
		this.sgnUpld2 = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sgUpld2});
		
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
window.app_eclaim3_transaksi_fDokLoadE.extend(window.childForm);
window.app_eclaim3_transaksi_fDokLoadE.implement({
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
					sql.add("delete from tlk_dok_m where no_dok='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tlk_dok_d where no_dok='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into tlk_dok_m(no_dok,tanggal,kode_lokasi,periode,nik_user,tgl_input,host,ip,catatan,no_klaim) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'"+this.app._hostname+"','"+this.app._iphost+"','"+this.e_memo.getText()+"','"+this.e_noklaim.getText()+"')");
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into tlk_dok_d(no_dok,kode_lokasi,kode_ref,no_file,nu,nik_user,tgl_input,ket_dok) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sgUpld.cells(0,i)+"','"+this.sgUpld.cells(4,i).filedest+"',"+ix+",'"+this.app._userLog+"',now(),'"+this.sgUpld.cells(2,i)+"')");
						}	
					}
					for (var i in this.listFiles.objList) {
						var ketemu = false;
						for (var j=0;j < this.sgUpld.getRowCount();j++){
							ketemu = i == this.sgUpld.cells(3,j);
							if (ketemu) break;
						}
						if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);					
					this.sgUpld.clear(1);	this.sgUpld2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					this.e_memo.setText("-");
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :													
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();								
				sql.add("delete from tlk_dok_m where no_dok='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from tlk_dok_d where no_dok='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				this.deletedFiles = "";	
				for (var i in this.listFiles.objList) {
					this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
				}
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
	},		
	doChange:function(sender){	
		if (sender == this.e_periode && this.e_periode.getText() != "") {										 							
			this.e_nb.setSQL("select b.no_dok, b.no_klaim from tlk_dok_m b inner join tlk_klaim a on a.no_klaim=b.no_klaim and a.kode_lokasi=b.kode_lokasi "+
			                 "where a.progress not in ('X','Z') and b.periode<='"+this.e_periode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",["no_dok","no_klaim"],false,["No Dok","No Klaim"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {										    
			var strSQL = "select a.no_klaim,date_format(a.tanggal,'%d/%m/%Y') as tanggal"+
						 ",a.nilai,a.no_polis,a.no_dokumen,date_format(a.tgl_dokumen,'%d/%m/%Y') as tgl_dokumen,a.alamat,b.nama as loker,c.nama as sebab,d.nama as objek, e.nama as pic, a.no_tel "+ 
						 ",f.tanggal as tgl_dok,f.catatan "+
						 "from tlk_klaim a "+
						 "inner join tlk_lokasi b on a.kode_lok=b.kode_lok and a.kode_lokasi=b.kode_lokasi and b.kode_ttg='"+this.app._kodeTtg+"' "+					 
						 "inner join tlk_obyek c on a.kode_obyek=c.kode_obyek and a.kode_lokasi=c.kode_lokasi and c.kode_ttg='"+this.app._kodeTtg+"' "+					 
						 "inner join tlk_sebab d on a.kode_sebab=d.kode_sebab and a.kode_lokasi=d.kode_lokasi and d.kode_ttg='"+this.app._kodeTtg+"' "+					 
						 "inner join tlk_hakakses e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi and e.kode_ttg='"+this.app._kodeTtg+"' "+					 
						 "inner join tlk_dok_m f on a.no_klaim=f.no_klaim and a.kode_lokasi=f.kode_lokasi "+						 
						 "where f.no_dok='"+this.e_nb.getText()+"' and f.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																																												
					this.progLama = line.progress;					
					this.e_noklaim.setText(line.no_klaim);
					this.e_tglklaim.setText(line.tanggal);		
					this.e_nopolis.setText(line.no_polis);		
					this.e_nodok.setText(line.no_dokumen);		
					this.e_nilai.setText(floatToNilai(line.nilai));		
					this.e_tgldok.setText(line.tgl_dokumen);		
					this.e_lokasi.setText(line.alamat);		
					this.e_loker.setText(line.loker);		
					this.e_sebab.setText(line.sebab);		
					this.e_objek.setText(line.objek);		
					this.e_pic.setText(line.pic);		
					this.e_tel.setText(line.no_tel);												
					this.dp_d1.setText(line.tgl_dok);					
					this.e_memo.setText(line.catatan);					
				} 
			}						
			this.sgUpld.clear();
			this.deleteFiles = [];
			this.listFiles = new arrayMap();			
			var data2 = this.dbLib.getDataProvider("select b.kode_ref,b.nama,a.no_file,a.ket_dok from tlk_dok_d a inner join tlk_ref b on a.kode_ref=b.kode_ref and b.kode_ttg='"+this.app._kodeTtg+"' where a.no_dok = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2;
				this.sgUpld.clear();
				for (var i in data2.rs.rows){
					line2 = data2.rs.rows[i];							
					this.listFiles.set(line2.no_file,line2.no_file); 
					this.sgUpld.appendData([line2.kode_ref,line2.nama,line2.ket_dok,line2.no_file, {filedest:line2.no_file, tmpfile:line2.no_file}]);
				}
			} else this.sgUpld.clear(1);									
			
			var data = this.dbLib.getDataProvider("select a.kode_ref,a.nama,ifnull(b.no_dok,'-') as no_dok,date_format(b.tanggal,'%d/%m/%Y') as tgl_dokumen,ifnull(b.ket_dok,'-') as keterangan,ifnull(b.no_file,'-') as no_file "+  
					   "from tlk_ref a left join (select x.no_klaim,x.tanggal,y.* from tlk_dok_m x inner join tlk_dok_d y on x.no_dok=y.no_dok and x.kode_lokasi=y.kode_lokasi where x.kode_lokasi='"+this.app._lokasi+"' and x.no_dok <>'"+this.e_nb.getText()+"' ) b on a.kode_ref=b.kode_ref and a.kode_lokasi=b.kode_lokasi and a.kode_ttg ='"+this.app._kodeTtg+"' "+
					   "where b.no_klaim='"+this.e_noklaim.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' order by a.kode_ref",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgUpld2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sgUpld2.appendData([line.kode_ref,line.nama,line.no_dok,line.tanggal,line.keterangan,line.no_file]);
				}
			} else this.sgUpld2.clear(1);
		}
	},				
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();							
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
					"select kode_ref, nama from tlk_ref where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
					"select count(kode_ref) from tlk_ref where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
					["kode_ref","nama"],"and",["Kode","Nama"],false);				
				}					
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sgUpld && col == 4){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(4).param2 + data.tmpfile;
                this.sgUpld.cells(3,row, data.filedest);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});