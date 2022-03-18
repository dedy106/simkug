/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fTTDVer = function(owner, ba, klpfa, fa, formView) {
	if (owner){
		
		window.app_assetsap_transaksi_fTTDVer.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fTTDVer";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Perubahan Tanda Tangan data Verifikasi  ", 0);	
		uses("util_file;uploader;saiCBBL;checkbox");			
		this.ed_jns = new saiCB(this,{bound:[20,4,200,20], caption:"Jenis Prosedur", change:[this,"doChange"]});									
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Bus. Area",
			multiSelection: false,
			text:this.app._kodeLokfa,
			rightLabel:this.app._namaLokfa,						
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
			change:[this,"doChange"]		
		});
		this.ed_kode = new saiCBBL(this,{bound:[20,2,220,20],caption:"No Verifikasi",readOnly:false,
			multiSelection:false,
			change:[this,"doChange"]
		});
		
		this.p2 = new panel(this,{bound:[20,12,440,200],caption:"Disiapkan Oleh"});
		this.sg2 = new saiGrid(this.p2,{bound:[1,20,438,145], colCount:2,colTitle:"NIK,Nama", buttonStyle:[[0],[bsEllips]],colWidth:[[1,0],[250,60]], rowCount:1, ellipsClick:[this,"doEllipsClick"]});
		this.sgn2 = new sgNavigator(this.p2,{bound:[1,this.p2.height - 25,438,25],buttonStyle:bsTrans, grid:this.sg2, pager:[this,"doPager"]});
		this.p3 = new panel(this,{bound:[480,12,440,200],caption:"Direview Oleh"});
		this.sg3 = new saiGrid(this.p3,{bound:[1,20,438,145], colCount:2,colTitle:"NIK,Nama", buttonStyle:[[0],[bsEllips]],colWidth:[[1,0],[250,60]], rowCount:1, ellipsClick:[this,"doEllipsClick"]});
		this.sgn3 = new sgNavigator(this.p3,{bound:[1,this.p2.height - 25,438,25],buttonStyle:bsTrans, grid:this.sg3, pager:[this,"doPager"]});
			
			
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
					
		this.onClose.set(this,"doClose");		
		this.dbLib.getDataProviderA("select kode_klp, nama from amu_alt_klp");
		this.doChange(this.ed_lokfa);		
		this.cekStatus = 0;		
		if (fa){			
			this.fromView = true;
			this.formView = formView;
		}
		
	}
};
window.app_assetsap_transaksi_fTTDVer.extend(window.childForm);
window.app_assetsap_transaksi_fTTDVer.implement({
	doClose: function(sender){				
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
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);								
					}
				break;
				case "simpan" :					
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){						
						sql.add("delete from amu_alt_ttd where no_bukti = '"+ this.ed_kode.getText()+"'");
						for (var i=0; i < this.sg2.getRowCount(); i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into amu_alt_ttd(no_bukti, status, nik,no_urut)values('"+this.ed_kode.getText()+"',0,'"+this.sg2.cells(0,i)+"',"+i+")");
							}
						}
						for (var i=0; i < this.sg3.getRowCount(); i++){
							if (this.sg3.rowValid(i)){
								sql.add("insert into amu_alt_ttd(no_bukti, status, nik,no_urut)values('"+this.ed_kode.getText()+"',1,'"+this.sg3.cells(0,i)+"',"+i+")");
							}
						}
						this.dbLib.execArraySQL(sql);
					}					
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){       
    },
	doFindBtnClick: function(sender){
				
	},
	doChange: function(sender){
		try{
			if (sender == this.ed_lokfa){						
				this.ed_kode.setSQL("select distinct no_ver, keterangan from amu_alt_ver_m "+
					"where kode_lokfa = '"+this.ed_lokfa.getText()+"'  ", ["no_ver","keterangan"],false, ["No Verifikasi","keterangan"], "and","Daftar Verifikasi",true);
			}	
			if (sender == this.ed_jns){
				this.ed_lokfa.setSQL("select kode_lokfa, nama from (select a.kode_lokfa, a.nama from amu_lokasi a "+
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi "+
					 "	inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U" || this.app._userStatus == "R" ? this.app._kodeLokfa : "%")+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U" || this.app._userStatus == "R"? this.app._kodeLokfa : "%")+"' and a.kode_induk = '00') ", 
						["kode_lokfa","nama"],false, ["Klp Aset","Nama"],"where","Data Kelompok Aset",true);
			}	
			if (sender == this.ed_kode){					
				this.no_inv = " ";
				var data = this.dbLib.getDataProvider("select a.nik, ifnull(b.nama,'-') as nama, a.status from amu_alt_ttd a left outer join amu_karyawan b on b.nik = a.nik "+
							" where a.no_bukti= '"+this.ed_kode.getText()+"' order by a.status, a.no_urut",true);
				if (typeof data != "string"){
					this.sg2.clear();
					this.sg3.clear();
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						if (parseFloat(line.status) == 0)
							this.sg2.appendData([line.nik, line.nama]);
						if (parseFloat(line.status) == 1)
							this.sg3.appendData([line.nik, line.nama]);
					}
				}
			}	
			if (sender == this.ed_nofa){				
			}
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){		
	},
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{									
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
							this.app._mainForm.bClear.click();                            
						}else system.info(this,result,"");
	    			break;	    
	    			case "getDataProvider":
						result = JSON.parse(result);						
						var line;						
						for (var i in result.rs.rows) {
							line = result.rs.rows[i];
							this.ed_jns.addItem(line.kode_klp, line.nama);
						}						
						this.doChange(this.ed_jns);
	    			break;			
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){	     			
       }
        
	},			
	doUploadFinish: function(sender, result, data, filename){
		try{				
			if (sender == this.upl_1){
				this.ed_file.setText(filename);				
				this.filename = filename +";"+urldecode(data);
			}
		}catch(e){
			alert(e);
		}
	},
	doEllipsClick:function(sender, col ,row){		
		try{			
			if (sender == this.sg2 || sender == this.sg3){
				this.standarLib.showListDataForSG(this, "Daftar Karyawan",sender, sender.row, sender.col, 
													  "select nik, nama from amu_karyawan ",
													  "select count(*) from amu_karyawan ",
													  ["nik","nama"],"where",["NIK","Nama"],false);
			}		
		}catch(e){
			alert(e);
		}
	}	
});
