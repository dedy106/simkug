window.app_saku2_transaksi_yks_fReverseHut = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fReverseHut.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_fReverseHut";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reverse Akru Hutang: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.e_debet = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		//this.cb_noapp = new saiCBBL(this,{bound:[20,17,220,20],caption:"No Approve", multiSelection:false, maxLength:10, tag:9});
		this.e_kredit = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
				
		this.bTampil = new button(this,{bound:[608,17,80,18],caption:"Tampil Data",click:[this,"doTampilClick"]});			
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,300], childPage:["Data Hutang Akru","Detail Jurnal Reverse"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
				colTitle:["No Invoice","Kode","Nama Mitra","Pegawai","Pensiun","Total","Rev. Pegawai","Rev. Pensiun"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,100,260,80,100]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
				colFormat:[[3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],				
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["No Invoice","Kode Akun","Nama Akun","DC","Keterangan","Pegawai","Pensiun"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,220,80,200,80,80]],
					columnReadOnly:[true,[2],[0,1,4,5,6]],
					colFormat:[[5,6],[cfNilai,cfNilai]],					
					buttonStyle:[[0,1,3],[bsAuto,bsEllips,bsAuto]], 
					picklist:[[3],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,					
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		this.sg2.setAllowBlank(true);
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");		
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			//this.cb_noapp.setSQL("select no_app, keterangan from yk_app_m where kode_lokasi='"+this.app._lokasi+"'",["no_app","keterangan"],false,["No Bukti","Keterangan"],"and","Data Approve",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_fReverseHut.extend(window.childForm);
window.app_saku2_transaksi_yks_fReverseHut.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_rekon_m","no_rekon",this.app._lokasi+"-RKN"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into yk_rekon_m(no_rekon,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','REV','HUT','IDR',1,"+parseNilai(this.e_debet.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F',getdate(),'"+this.app._userLog+"')");					
					if (this.sg2.getRowValidCount() > 0){
						var nilai = 0;
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								nilai = nilaiToFloat(this.sg2.cells(5,i)) + nilaiToFloat(this.sg2.cells(6,i));
								sql.add("insert into yk_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(1,i)+"','"+this.sg2.cells(4,i)+"','"+this.sg2.cells(3,i)+"',"+nilai+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','REV','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
							}
						}
					}
					var nobukti = "";
					var nilai = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						nilai = floatToNilai(this.sg.cells(6,i)) + floatToNilai(this.sg.cells(7,i));
						if (this.sg.rowValid(i) && nilai != 0) {
							nobukti += ",'"+this.sg.cells(1,i)+"'";
							sql.add("insert into yk_rekon_d(no_rekon,kode_lokasi,periode,no_hutang,no_app,no_kas,modul,nilai_bp,nilai_cc) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(0,i)+"','"+this.e_nb.getText()+"','REV',"+parseNilai(this.sg.cells(6,i))+","+parseNilai(this.sg.cells(7,i))+")");
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1);this.sg2.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg2.validasi();
				for (var j = 0; j < this.sg.rows.getLength();j++){
					if (nilaiToFloat(this.sg.cells(3,j)) < nilaiToFloat(this.sg.cells(6,j))) {
						system.alert(this,"Transaksi tidak valid.","Rev Pegawai melebihi Saldo Hutang Pegawai. (Baris "+ (j+1).toString() +")");
						return false;						
					}
					if (nilaiToFloat(this.sg.cells(3,j)) < nilaiToFloat(this.sg.cells(6,j))) {
						system.alert(this,"Transaksi tidak valid.","Rev Pensiun melebihi Saldo Hutang Pensiun. (Baris "+ (j+1).toString() +")");
						return false;						
					}
				}

				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
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
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doTampilClick:function(sender){		
		var data = this.dbLib.getDataProvider(
				   "select a.no_hutang,a.kode_vendor,b.nama,a.nilai_bp-isnull(c.rekon_bp,0) as nilai_bp,a.nilai_cc-isnull(c.rekon_cc,0) as nilai_cc,a.nilai_bp+a.nilai_cc -isnull(c.rekon_bp,0)-isnull(c.rekon_cc,0) as total "+
				   "from yk_hutang_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
				   "                   left join (select no_hutang,kode_lokasi,sum(nilai_bp) as rekon_bp,sum(nilai_cc) as rekon_cc from yk_rekon_d where modul='REV' and kode_lokasi='"+this.app._lokasi+"' group by no_hutang,kode_lokasi) c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi "+
				   "where a.periode ='201012' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_vendor",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			var values = [];
			this.sg.showLoading();			
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.no_hutang,line.kode_vendor,line.nama,floatToNilai(line.nilai_bp),floatToNilai(line.nilai_cc),floatToNilai(line.total),"0","0"]);
				values[values.length] = data.rs.rows[i].no_hutang;
			}
			this.sg.hideLoading();			
		} else this.sg.clear(1);
		
		
		this.sg2.columns.get(0).pickList.clear();
		for (var v in values) {
			this.sg2.columns.get(0).pickList.set(v,values[v]);
		}
		this.sg2.columns.get(0).pickList.set(v+1,"-");
			
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	},		
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_rekon_m","no_rekon",this.app._lokasi+"-RKN"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_dok.setFocus();
	},	
	doChangeCell: function(sender, col, row){
		if ((col == 0 || col == 3 || col == 5 || col == 6) && (this.sg2.cells(5,row) != "") && (this.sg2.cells(6,row) != "")) this.sg2.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 1) {
			if (sender.cells(1,row) != "") {
				var akun = this.dataAkun.get(sender.cells(1,row));
				if (akun) sender.cells(2,row,akun);
				else {                                    
					if (trim(sender.cells(1,row)) != "") system.alert(this,"Kode Akun "+sender.cells(1,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(1,row,"");
					sender.cells(2,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			for (var i = 0; i < this.sg.rows.getLength();i++){
				this.sg.cells(6,i,"0");
				this.sg.cells(7,i,"0");
			}			
			var totD = totC = 0;						
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(5,i) != "" && this.sg2.cells(6,i) != ""){
					if (this.sg2.cells(3,i).toUpperCase() == "D") {						
						totD += nilaiToFloat(this.sg2.cells(5,i))+ nilaiToFloat(this.sg2.cells(6,i));
						
						for (var j = 0; j < this.sg.rows.getLength();j++){
							if (this.sg.cells(0,j) == this.sg2.cells(0,i)) {
								this.sg.cells(6,j,floatToNilai(nilaiToFloat(this.sg.cells(6,j)) + nilaiToFloat(this.sg2.cells(5,i))));
								this.sg.cells(7,j,floatToNilai(nilaiToFloat(this.sg.cells(7,j)) + nilaiToFloat(this.sg2.cells(6,i))));								
							}
						}
						
					}					
					if (this.sg2.cells(3,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg2.cells(5,i))+ nilaiToFloat(this.sg2.cells(6,i));				
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 0 : 
					if (this.sg2.cells(0,row) == "") {
						if (row != 0) this.sg2.setCell(0,row,this.sg2.cells(0,(row-1)));						
					}
				break;
			case 1 : 
					if (this.sg2.cells(1,row) == "") {
						if (row != 0) this.sg2.setCell(1,row,this.sg2.cells(1,(row-1)));						
					}
				break;

			case 4 : 
					if (this.sg2.cells(4,row) == ""){
						if (row == 0) this.sg2.setCell(4,row,this.e_ket.getText());
						else this.sg2.setCell(4,row,this.sg2.cells(4,(row-1)) );
					}
				break;			
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 1){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});


/*
select 
a.kode_vendor,a.nilai_bp, a.nilai_cc,
isnull(x.saldo_bp,0) as saldo_bp10, 
isnull(x.saldo_cc,0) as saldo_cc10,

case when a.nilai_bp < isnull(x.saldo_bp,0) then  a.nilai_bp else isnull(x.saldo_bp,0) end as rev_bp,
case when a.nilai_cc < isnull(x.saldo_cc,0) then  a.nilai_cc else isnull(x.saldo_bp,0) end as rev_cc
from (
        select  a.kode_vendor,a.kode_lokasi,
	case  when f.jenis='PENSIUN' then sum(a.nilai - a.pph) else 0 end as nilai_bp,	
	case  when f.jenis<>'PENSIUN' then sum(a.nilai - a.pph) else 0 end as nilai_cc
	from yk_bill_d a 
             inner join cust f on a.loker=f.kode_cust
	where a.no_app = '01-APP1102.001' and a.kode_lokasi='01' 	
	group by a.kode_vendor,a.kode_lokasi,f.jenis

) a  left join (
		select a.kode_vendor,a.kode_lokasi,sum(a.nilai_bp-isnull(c.rekon_bp,0)) as saldo_bp,
                       sum(a.nilai_cc-isnull(c.rekon_cc,0)) as saldo_cc 
	        from yk_hutang_d a 
		     left join (select no_hutang,kode_lokasi,sum(nilai_bp) as rekon_bp,sum(nilai_cc) as rekon_cc 
	                        from yk_rekon_d where kode_lokasi='01' and modul='REV'
	                        group by no_hutang,kode_lokasi) c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi 
		where a.periode ='201012' and a.kode_lokasi='01'
		group by a.kode_vendor,a.kode_lokasi
		) x on a.kode_vendor=x.kode_vendor and a.kode_lokasi=x.kode_lokasi

*/


