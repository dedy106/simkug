window.app_saku2_transaksi_kpa_fKpaVerE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kpa_fKpaVerE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kpa_fKpaVerE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Permohonan : Edit", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,18,980,480], childPage:["Detail Permohonan","Akun Verifikasi","Data KPA"]});										
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,10,202,20],caption:"Status Approval",items:["APPROVE","REJECT","RETURN"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_nokpa = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"No Bukti", readOnly:true});						
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,13,450,20],caption:"No Dokumen", readOnly:true});						
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Deskripsi", readOnly:true});								
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,15,450,20],caption:"Pihak Ketiga", readOnly:true});										
		this.e_memo = new saiMemo(this.pc1.childPage[0],{bound:[20,12,450,80],caption:"Catatan",tag:9,readOnly:true});
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[770,12,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
	
		this.sg3 = new saiGrid(this.pc1.childPage[0],{bound:[10,10,this.pc1.width-20,this.pc1.height-170],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],										
					readOnly:true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],					
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter2"],ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		
		
		this.sg4 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});			

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
					
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kpa_fKpaVerE.extend(window.childForm);
window.app_saku2_transaksi_kpa_fKpaVerE.implement({
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
					sql.add("delete from itt_ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from itt_ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from itt_kpa_j where jenis='VER' and no_kpa='"+this.e_nokpa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update itt_kpa_m set nilai="+this.nilaiLama+",progress='0',no_ver='-' where no_kpa='"+this.e_nokpa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					if (this.c_status.getText()=="APPROVE")  var prog = "1";
					if (this.c_status.getText()=="RETURN")  var prog = "R";
					if (this.c_status.getText()=="REJECT")  var prog = "X";
					
					sql.add("update itt_kpa_m set nilai="+parseNilai(this.e_total.getText())+",progress='"+prog+"',no_ver='"+this.e_nb.getText()+"' where no_kpa='"+this.e_nokpa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into itt_kpa_j(no_kpa,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nokpa.getText()+"','"+this.e_dok.getText()+"','"+this.tgl+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.sg2.cells(5,i)+"','"+this.sg2.cells(7,i)+"','"+this.app._lokasi+"','SPB','VER','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							}
						}
					}
					sql.add("insert into itt_ver_m (no_ver,tanggal,kode_lokasi,periode,nik_user,tgl_input,status) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"')");
					sql.add("insert into itt_ver_d (no_ver,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+prog+"','KPA','"+this.e_nokpa.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");					
					
					if (prog == "X"){
						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai)"+
								"select '"+this.e_nb.getText()+"','VERKPA','"+this.app._lokasi+"',kode_akun,kode_pp,kode_drk,periode1,'"+this.e_periode.getText()+"',case dc when 'D' then 'C' else 'D' end,0,nilai from angg_r where no_bukti = '"+this.e_nokpa.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");						
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
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from itt_kpa_j where jenis='VER' and no_kpa='"+this.e_nokpa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from itt_ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from itt_ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update itt_kpa_m set nilai="+this.nilaiLama+",progress='0',no_ver='-' where no_kpa='"+this.e_nokpa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				
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
			//RETURN dan REJECT tidak dapat di koreksi,,,sebab kalo return data verifikasi sudah dimatikan (supaya tidak ada duplikasi data 1 kpa n verifikasi)
			//kalo REJECT sudah batalin anggaran...
			this.e_nb.setSQL("select b.no_ver, b.no_bukti from itt_ver_d b inner join itt_kpa_m a on a.no_kpa=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
							 "       inner join itt_ver_m c on b.no_ver=c.no_ver and a.kode_lokasi=c.kode_lokasi "+ 							 
			                 "where c.status ='APPROVE' and a.progress ='1' and c.periode='"+this.e_periode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",["b.no_ver","b.no_bukti"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {					
			var strSQL = "select a.tanggal,c.no_kpa,c.keterangan,c.no_dokumen,c.vendor,b.catatan,case c.progress when '1' then 'APPROVE' when 'R' then 'RETURN' when 'X' then 'REJECT' end as progress "+						 
						 "from itt_ver_m a inner join itt_ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
						 "                 inner join itt_kpa_m c on b.no_bukti=c.no_kpa and b.kode_lokasi=c.kode_lokasi "+
						 "where a.no_ver='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){															
					this.dp_d1.setText(line.tanggal);										
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.c_status.setText(line.progress.toUpperCase());
					this.e_nokpa.setText(line.no_kpa);
					this.e_vendor.setText(line.vendor);					
					this.e_memo.setText(line.catatan);
				} 
			}			
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from itt_kpa_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"            	  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"                 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
						"where a.jenis<>'VER' and a.no_kpa = '"+this.e_nokpa.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sg3.clear(1);
			
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from itt_kpa_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"            	  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"                 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
						"where a.jenis='VER' and a.no_kpa = '"+this.e_nokpa.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sg2.clear(1);			
			this.sg3.validasi();
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
						"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"              left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.no_bukti = '"+this.e_nokpa.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='KPA' order by a.kode_akun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg4.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
				}
			} else this.sg4.clear(1);									
		}
	},
	doNilaiChange: function(){
		try{			
			var tot=0;
			for (var i = 0; i < this.sg3.rows.getLength();i++){
				if (this.sg3.rowValid(i) && this.sg3.cells(4,i) != ""){
					if (this.sg3.cells(2,i)=="D") tot += nilaiToFloat(this.sg3.cells(4,i));
					if (this.sg3.cells(2,i)=="C") tot -= nilaiToFloat(this.sg3.cells(4,i));
				}
			}			
			this.nilaiLama = tot;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i)=="D") tot += nilaiToFloat(this.sg2.cells(4,i));
					if (this.sg2.cells(2,i)=="C") tot -= nilaiToFloat(this.sg2.cells(4,i));
				}
			}			
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	//---------------
	doChangeCell2: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg2.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}
		if (col == 7) {
			if (sender.cells(7,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and b.kode_drk = '"+sender.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) sender.cells(8,row,line.nama);
					else {
						if (!isAda) sender.cells(8,row,"-");
						else {
							sender.cells(7,row,"");
							sender.cells(8,row,"");
						}
					}
				}
			}
		}
		sender.onChange.set(this,"doChangeCell2");		
	},		
	doCellEnter2: function(sender, col, row){
		switch(col){
			case 2 : 
					this.sg2.cells(2,row,"C");
			case 3 : 
					if (this.sg2.cells(3,row) == ""){
						if (row != 0) this.sg2.setCell(3,row,this.sg2.cells(3,(row-1)) );
					}
				break;			
			case 5 : 
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}					
				break;
		}
	},		
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(a.kode_akun) from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg2.cells(0,row)+"' and b.kode_pp = '"+this.sg2.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg2.cells(0,row)+"' and b.kode_pp = '"+this.sg2.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg2.cells(0,row)+"' and b.kode_pp = '"+this.sg2.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  ["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	//---------------
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
	}
});