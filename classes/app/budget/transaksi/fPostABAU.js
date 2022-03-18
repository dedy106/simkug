/**
 * @author mr
 */
window.app_budget_transaksi_fPostABAU = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fPostABAU.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fPostABAU";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Posting Data Anggaran : Input", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;portalui_saiCBB");			
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Tahun Angg.",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
			this.bGen = new portalui_button(this, {bound: [256, 78, 80, 20],caption: "Gen",icon: "url(icon/" + system.getThemes() + "/process.png)"});
			this.ed_nb = new portalui_saiLabelEdit(this, {bound: [20, 78, 230, 20],caption: "No Bukti",readOnly:true});			

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.setTabChildIndex(); 

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();											
			this.bGen.onClick.set(this, "genClick");
			
			this.standarLib.clearByTag(this,["0","1"],undefined);				
			this.baris = this.app._baris;
			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fPostABAU.extend(window.portalui_childForm);
window.app_budget_transaksi_fPostABAU.implement({
	mainButtonClick : function(sender){
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
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","8","9"),undefined);				
				}
				break;
			case "simpan" :		
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abaupost_m','no_post',this.app._lokasi+"-POST"+this.eTahun.getText().substr(2,2)+".",'0000'));
				var sql = new server_util_arrayList();								
				sql.add("delete from agg_abaupost_m where keterangan = 'POST' and periode like '"+this.eTahun.getText()+"%'");
				sql.add("delete from agg_gldt where modul = 'POST' and periode like '"+this.eTahun.getText()+"%'");

				sql.add("insert into agg_abaupost_m(no_post, kode_lokasi, keterangan, tgl_input, nik_user, periode)"+
						"                values('"+this.ed_nb.getText()+"','"+this.app._lokKonsol+"','POST',now(), '"+this.app._userLog+"','"+this.eTahun.getText()+"')");
				
				//BEBAN
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','POST','BEBAN','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01',kode_akun,case substring(kode_akun,1,1) when '3' then 'C' else 'D' end,round(sum(nilai),0),'-',kode_pp,periode,'-','IDR',1,round(sum(nilai),0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_d where periode like '"+this.eTahun.getText()+"%' and modul not in ('BP','PKUNJ','INV','BO','CC','ASSET') group by periode,kode_akun,kode_pp");				
				
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) "+
						 "select '"+this.ed_nb.getText()+"',2,'"+this.app._lokKonsol+"','POST','KB','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','1111021121','C',round(sum(case dc when 'D' then nilai else -nilai end) * 98.8/100,0),'-','-',periode,'-','IDR',1,round(sum(case dc when 'D' then nilai else -nilai end) * 98.8/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-','1' "+
						 "from agg_gldt where periode like '"+this.eTahun.getText()+"%' and modul ='POST' and jenis = 'BEBAN' group by periode");
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',3,'"+this.app._lokKonsol+"','POST','UM','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','1132010021','C',round(sum(case dc when 'D' then nilai else -nilai end) * 0.5/100,0),'-','-',periode,'-','IDR',1,round(sum(case dc when 'D' then nilai else -nilai end) * 0.5/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun.getText()+"%' and modul ='POST' and jenis = 'BEBAN' group by periode");
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',4,'"+this.app._lokKonsol+"','POST','PJK','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','2162000000','C',round(sum(case dc when 'D' then nilai else -nilai end) * 0.2/100,0),'-','-',periode,'-','IDR',1,round(sum(case dc when 'D' then nilai else -nilai end) * 0.2/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun.getText()+"%' and modul ='POST' and jenis = 'BEBAN' group by periode");
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',5,'"+this.app._lokKonsol+"','POST','BYMHD','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','2172000000','C',round(sum(case dc when 'D' then nilai else -nilai end) * 0.5/100,0),'-','-',periode,'-','IDR',1,round(sum(case dc when 'D' then nilai else -nilai end) * 0.5/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun.getText()+"%' and modul ='POST' and jenis = 'BEBAN' group by periode");
				//AKTAP
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','POST','BP','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01',kode_akun,case substring(kode_akun,1,1) when '3' then 'C' else 'D' end,round(sum(nilai),0),'-',kode_pp,periode,'-','IDR',1,round(sum(nilai),0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_d where periode like '"+this.eTahun.getText()+"%' and modul = 'BP' group by periode,kode_akun,kode_pp");								
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',1,'"+this.app._lokKonsol+"','POST','AP','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01',akun_ap,'C',round(sum(nilai),0),'-',kode_pp,periode,'-','IDR',1,round(sum(nilai),0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_fasusut_d where periode like '"+this.eTahun.getText()+"%' and status='BP' group by periode,akun_ap,kode_pp");						 

				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',10,'"+this.app._lokKonsol+"','POST','ASSET','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01',kode_akun,'D',sum(nilai),'-',kode_pp,periode,'-','IDR',1,sum(nilai),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_d where periode like '"+this.eTahun.getText()+"%' and modul = 'ASSET' group by periode,kode_akun,kode_pp");				
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) "+
						 "select '"+this.ed_nb.getText()+"',11,'"+this.app._lokKonsol+"','POST','KBAS','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','1111021121','C',round(sum(nilai) * 95/100,0),'-','-',periode,'-','IDR',1,round(sum(nilai) * 95/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-','11' "+
						 "from agg_gldt where periode like '"+this.eTahun.getText()+"%' and modul = 'POST' and jenis = 'ASSET' group by periode");
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						"select '"+this.ed_nb.getText()+"',12,'"+this.app._lokKonsol+"','POST','BYMHDAS','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','2172000000','C',round(sum(nilai) * 5/100,0),'-','-',periode,'-','IDR',1,round(sum(nilai) * 5/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						"from agg_gldt where periode like '"+this.eTahun.getText()+"%' and modul = 'POST'  and jenis = 'ASSET' group by periode");
				//KUNJ
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',21,'"+this.app._lokKonsol+"','POST','PKUNJ','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01',kode_akun,'C',round(sum(nilai),0),'-',kode_pp,periode,'-','IDR',1,round(sum(nilai),0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_d where periode like '"+this.eTahun.getText()+"%' and modul = 'PKUNJ' group by periode,kode_akun,kode_pp");				
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',22,'"+this.app._lokKonsol+"','POST','PIUKUNJ','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','1151000000','D',round(sum(nilai),0),'-',kode_pp,periode,'-','IDR',1,round(sum(nilai),0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun.getText()+"%' and modul = 'POST' and jenis = 'PKUNJ' group by periode,kode_pp");
				
				//BPCC
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',31,'"+this.app._lokKonsol+"','POST','BO','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01',kode_akun,'D',round(sum(nilai),0),'-',kode_pp,periode,'-','IDR',1,round(sum(nilai),0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_d where periode like '"+this.eTahun.getText()+"%' and modul = 'BO' group by periode,kode_akun,kode_pp");
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',32,'"+this.app._lokKonsol+"','POST','CC','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01',kode_akun,'D',round(sum(nilai),0),'-',kode_pp,periode,'-','IDR',1,round(sum(nilai),0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_d where periode like '"+this.eTahun.getText()+"%' and modul = 'CC' group by periode,kode_akun,kode_pp");
		 
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) "+
						 "select '"+this.ed_nb.getText()+"',311,'"+this.app._lokKonsol+"','POST','KBBO','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','1111021121','C',round(sum(nilai)*90/100,0),'-',kode_pp,periode,'-','IDR',1,round(sum(nilai)*90/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-','13' "+
						 "from agg_gldt where periode like '"+this.eTahun.getText()+"%' and modul = 'POST' and jenis='BO' group by periode,kode_pp");
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',312,'"+this.app._lokKonsol+"','POST','HUTBO','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','2121010001','C',round(sum(nilai)*10/100,0),'-',kode_pp,periode,'-','IDR',1,round(sum(nilai)*10/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun.getText()+"%' and modul = 'POST' and jenis='BO' group by periode,kode_pp");
				
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) "+
						 "select '"+this.ed_nb.getText()+"',321,'"+this.app._lokKonsol+"','POST','KBCC','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','1111021121','C',round(sum(nilai)*93/100,0),'-',kode_pp,periode,'-','IDR',1,round(sum(nilai)*93/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-','17' "+
						 "from agg_gldt where periode like '"+this.eTahun.getText()+"%' and modul = 'POST' and jenis = 'CC' group by periode,kode_pp");
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','POST','HUTCC','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','2122210001','C',round(sum(nilai)*7/100,0),'-',kode_pp,periode,'-','IDR',1,round(sum(nilai)*7/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun.getText()+"%' and modul = 'POST' and jenis = 'CC' group by periode,kode_pp");

						 
				//KOMA
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						"select '"+this.ed_nb.getText()+"',99,'"+this.app._lokKonsol+"','POST','KOMA','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','5402000002',case when sum(case dc when 'D' then nilai else -nilai end)<0 then 'D' else 'C' end,abs(sum(case dc when 'D' then nilai else -nilai end)),'-','-',periode,'-','IDR',1,abs(sum(case dc when 'D' then nilai else -nilai end)),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						"from agg_gldt where periode like '"+this.eTahun.getText()+"%'  and modul ='POST' group by periode");
				

				this.dbLib.execArraySQL(sql);
				break;
			case "simpancek" : this.simpan();
				break;
		}
	},
	genClick: function(sender){
		try{
			if (this.ed_period != ""){
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abaupost_m','no_post',this.app._lokasi+"-POST"+this.eTahun.getText().substr(2,2)+".",'0000'));
			}
		}
		catch (e)
		{
			alert(e);
		}
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
						this.app._mainForm.pesan(2,"Transaksi sukses tersimpan dengan no bukti :("+ this.ed_nb.getText()+")");						
						this.app._mainForm.bClear.click();              						
					}else system.info(this,result,"");
	    			break;	      			
					case "listData" :
						this.sg1.clear(1); 
					break;
	    		}
			}
			catch(e)
			{
				alert(e);
			}
	    }
	}
});
