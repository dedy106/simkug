window.app_hris_transaksi_gaji_fHitungLembur = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_gaji_fHitungLembur.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_gaji_fHitungLembur";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan Uang Lembur: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Lembur",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:100});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,205,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.bTampil = new button(this,{bound:[828,16,80,18],caption:"Tampil Data",click:[this,"doTampilClick"]});			
			
		this.p1 = new panel(this,{bound:[10,23,900,333],caption:"Data Lembur Karyawan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,895,280],colCount:14,tag:0,
		            colTitle:["NIK","Nama","Grade","Loker","Nilai Gaji","Upah/Jam","Hari","Jenis","Tanggal","Jml Jam",
					          "U.Lembur","U.Makan","U.Trans","Total"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80, 80,80,70,80,80,80,70,70,150,80]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,10,11,12,13],[8,9]],
					buttonStyle:[[0,6,7,8],[bsEllips,bsAuto,bsAuto,bsDate]], 
					colFormat:[[8,4,5,9,10,11,12,13],[cfDate,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					picklist:[[6,7],[new portalui_arrayMap({items:["SENIN","SELASA","RABU","KAMIS","JUMAT","SABTU","MINGGU"]}),
					                 new portalui_arrayMap({items:["HK","HL"]})]],defaultRow:1,
					change:[this,"doChangeCell"],ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,310,899,25],buttonStyle:2,grid:this.sg});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_gaji_fHitungLembur.extend(window.childForm);
window.app_hris_transaksi_gaji_fHitungLembur.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_gajilembur_m","no_lembur",this.app._lokasi+"-ULB"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_gajilembur_m(no_lembur,kode_lokasi,periode,tanggal,keterangan,nik_buat,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"')");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_gajilembur_d(no_lembur,kode_lokasi,nik,kode_grade,kode_loker,nilai_gaji,upah,hari,jenis_hari,tgl_lembur,jml_jam,nilai_lembur,nilai_makan,nilai_trans,periode) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+",'"+this.sg.cells(6,i)+"','"+this.sg.cells(7,i)+"','"+this.sg.getCellDateValue(8,i)+"',"+parseNilai(this.sg.cells(9,i))+","+parseNilai(this.sg.cells(10,i))+","+parseNilai(this.sg.cells(11,i))+","+parseNilai(this.sg.cells(12,i))+",'"+this.e_periode.getText()+"')");
							}
						}
					}
					sql.add("update gr_lembur set no_lembur_gaji = '"+this.e_nb.getText()+"' where progress = '1' and no_lembur_gaji='-' and periode <='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
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
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_gajilembur_m","no_lembur",this.app._lokasi+"-ULB"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doTampilClick:function(sender){
		if (this.e_periode.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.nik,a.nama,a.kode_grade,a.kode_loker,isnull(b.upah,0) as upah,c.hari,c.jenis_hari,convert(varchar,c.tanggal,103) as tanggal,c.jam_kerja as jml_jam "+
					"from gr_karyawan a inner join gr_lembur c on a.nik=c.nik_buat and a.kode_lokasi=c.kode_lokasi "+
					"				    left join ("+
					"                   select a.nik,a.kode_lokasi,sum(a.nilai) as nilai,round(sum(a.nilai)/173,0) as upah "+
					"                   from gr_gaji_nik a inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
					"                   where b.dc = 'D' and a.kode_lokasi = '"+this.app._lokasi+"' group by a.nik,a.kode_lokasi "+ 
					"                   ) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
					"where c.progress = '2' and c.no_lembur_gaji='-' and c.periode<='"+this.e_periode.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.nik,line.nama,line.kode_grade,line.kode_loker,floatToNilai(line.gaji),floatToNilai(line.upah),line.hari,line.jenis_hari,line.tanggal,floatToNilai(line.jml_jam),"0","0","0","0"]);
					this.doChangeCell(this.sg,7,i);
				}
			} else this.sg.clear(1);			
		
			if (this.sg.getRowValidCount() > 0){
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						var data = this.dbLib.getDataProvider("select u_lembur,u_makan,u_trans from gr_lembur_grade where kode_grade='"+this.sg.cells(2,i)+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){
								var uLembur = parseFloat(line.u_lembur) * nilaiToFloat(this.sg.cells(10,i));
								this.sg.cells(10,i,floatToNilai(uLembur));
								var uMakan = parseFloat(line.u_makan) * nilaiToFloat(this.sg.cells(11,i));
								this.sg.cells(11,i,floatToNilai(uMakan));
								var uTrans = parseFloat(line.u_trans) * nilaiToFloat(this.sg.cells(12,i));
								this.sg.cells(12,i,floatToNilai(uTrans));
								var total = uLembur + uMakan + uTrans;
								this.sg.cells(13,i,floatToNilai(total));
							}
						}
					}
				}
			}
			
		}
		else {
			system.alert(this,"Data tidak valid.","Periode harus diisi.");
		}
	},
	doEllipsClick: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Karyawan",this.sg, this.sg.row, this.sg.col, 
														"select nik,nama,kode_grade,kode_loker from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",
														"select count(nik) from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("nik","nama","kode_grade","kode_loker"),"and",new Array("NIK","Nama","Grade","Loker"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},		
	doChangeCell: function(sender, col, row) {
		try{
			if (col == 0) {
				this.sg.setCell(2,row,this.sg.dataFromList[2]);
				this.sg.setCell(3,row,this.sg.dataFromList[3]);
				var data = this.dbLib.getDataProvider(
					"select sum(a.nilai) as nilai,round(sum(a.nilai)/173,0) as upah from gr_gaji_nik a inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
					"where b.dc = 'D' and a.kode_lokasi = '"+this.app._lokasi+"' and a.nik = '"+this.sg.cells(0,row)+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.sg.setCell(4,row,floatToNilai(line.nilai));
						this.sg.setCell(5,row,floatToNilai(line.upah));
					}
				}
			}
			if (col == 6) {
				if (this.sg.cells(6,row) == "SABTU" || this.sg.cells(6,row) == "MINGGU") this.sg.setCell(7,row,"HL");
				else this.sg.setCell(7,row,"HK");
			}
			if (col == 7 || col == 9) {
				if (this.sg.cells(7,row) != "" && this.sg.cells(9,row) != "" && this.sg.cells(5,row) != "") {
					var data = this.dbLib.getDataProvider("select value1,value2 from gr_spro where kode_lokasi = '"+this.app._lokasi+"' and kode_spro = '"+this.sg.cells(7,row)+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (this.sg.cells(2,row).substr(0,1) == "1") {
								if (nilaiToFloat(this.sg.cells(9,row)) >= line.value1) this.sg.setCell(11,row,floatToNilai(line.value2));
								else this.sg.setCell(11,row,"0");
							}
							else this.sg.setCell(11,row,floatToNilai(line.value2));
						}
					}
					var data = this.dbLib.getDataProvider("select a.value1,b.nilai from gr_spro a cross join (select * from gr_lembur_trans) b where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_spro = '"+this.sg.cells(7,row)+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (nilaiToFloat(this.sg.cells(9,row)) >= line.value1) this.sg.setCell(12,row,floatToNilai(line.nilai));
							else this.sg.setCell(12,row,"0");							
						}
					}
					var jml = nilaiToFloat(this.sg.cells(9,row));
					var nilai = 0;
					var data = this.dbLib.getDataProvider("select (jam_akhir-jam_awal+1) as selisih,pengali from gr_lembur_param where jenis = '"+this.sg.cells(7,row)+"' and kode_lokasi='"+this.app._lokasi+"' order by jam_awal",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							if (jml < line.selisih) {
								nilai = nilai + Math.round(nilaiToFloat(this.sg.cells(5,row)) * line.pengali * jml,0);
								break;
							}
							else { 
								nilai = nilai + Math.round(nilaiToFloat(this.sg.cells(5,row)) * line.pengali * line.selisih);
								jml = jml - line.selisih;
								if (jml == 0) break;
							}
						}
					} 
					this.sg.setCell(10,row,floatToNilai(nilai));
				}
			}		
			if (col == 10 || col == 11 || col == 12) {
			    if (this.sg.cells(10,row) != "" && this.sg.cells(11,row) != "" && this.sg.cells(12,row) != "") {
					var total = nilaiToFloat(this.sg.cells(10,row)) + nilaiToFloat(this.sg.cells(11,row)) + nilaiToFloat(this.sg.cells(12,row));
					this.sg.setCell(13,row,floatToNilai(total));
				}
			}
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
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